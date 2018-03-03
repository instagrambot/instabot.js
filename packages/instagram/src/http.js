const request = require('request-promise-native')
const deepmerge = require('deepmerge')
const Cookies = require('./cookies')

const BASE_URL = 'https://www.instagram.com/'

module.exports = class Http {
  constructor () {
    this.cookies = new Cookies()

    this.send = request.defaults({
      baseUrl: BASE_URL,
      Referer: BASE_URL,
      resolveWithFullResponse: true
    })
  }

  optionsFrom (options) {
    return deepmerge({
      jar: this.cookies.toJar(),
      headers: {
        'X-CSRFToken': this.cookies.valueOf('csrftoken')
      }
    }, options)
  }

  async request (options) {
    const { cookies } = this
    const opts = this.optionsFrom(options)

    // We use custom jar
    const jar = options.jar
    delete options.jar

    // Prepare cookies if first request
    if (cookies.isEmpty()) {
      const resp = await this.send.get('/')
      cookies.fromResponse(resp)
    }

    const resp = await this.send(opts)

    if (jar) cookies.fromResponse(resp)

    return resp
  }

  get (uri, options) {
    return this.request({ method: 'GET', uri, ...options })
  }

  post (uri, options) {
    return this.request({ method: 'GET', uri, ...options })
  }
}
