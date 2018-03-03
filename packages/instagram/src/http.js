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

  async request (requestOptions) {
    const defaults = {
      jar: this.cookies.toJar(),
      headers: {
        'X-CSRFToken': this.cookies.valueOf('csrftoken')
      }
    }

    const options = deepmerge(defaults, requestOptions)
    const resp = await this.send(options)

    // Like request.jar() but out implementation
    if (options.jar) {
      delete options.jar
      this.cookies.fromResponse(resp)
    }

    return resp
  }

  get (uri, options) {
    return this.request({ method: 'GET', uri, ...options })
  }

  post (uri, options) {
    return this.request({ method: 'GET', uri, ...options })
  }
}
