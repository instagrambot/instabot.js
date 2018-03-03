const request = require('request-promise-native')
const deepmerge = require('deepmerge')
const Cookies = require('./cookies')

const BASE_URL = 'https://www.instagram.com/'
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36 OPR/50.0.2762.67'

module.exports = class Http {
  constructor () {
    this.cookies = new Cookies()

    this.send = request.defaults({
      baseUrl: BASE_URL,
      resolveWithFullResponse: true,
      headers: {
        'origin': BASE_URL,
        'referer': BASE_URL,
        'user-agent': USER_AGENT,
        'accept-language': 'en-US,en;q=0.9',
        'accept-encoding': 'gzip, deflate, br',
        'cache-control': 'no-cache',
        'pragma': 'no-cache',
        'x-instagram-ajax': 1,
        'x-requested-with': 'XMLHttpRequest'
      }
    })
  }

  optionsFrom (options) {
    const headers = {
      'x-csrftoken': this.cookies.valueOf('csrftoken')
    }

    const opts = deepmerge({ headers }, options)
    opts.jar = this.cookies.toJar()

    return opts
  }

  async request (options = {}) {
    // Prepare cookies if first request
    if (this.cookies.isEmpty()) {
      const resp = await this.send.get('/')
      this.cookies.fromResponse(resp)
    }

    const jar = options.jar
    const opts = this.optionsFrom(options)
    const resp = await this.send(opts)

    if (jar) this.cookies.fromResponse(resp)

    return resp
  }

  get (uri, options) {
    return this.request({ method: 'GET', uri, ...options })
  }

  post (uri, options) {
    return this.request({ method: 'POST', uri, ...options })
  }
}
