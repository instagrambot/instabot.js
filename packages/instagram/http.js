const request = require('request-promise-native')
const deepmerge = require('deepmerge')
const csrf = require('./csrf.js')

const BASE_URL = 'https://www.instagram.com/'

module.exports = class Http {
  constructor () {
    this.csrf = null

    this.adapter = request.defaults({
      baseUrl: BASE_URL,
      Referer: BASE_URL
    })
  }

  async prepare () {
    if (this.csrf == null) this.csrf = await csrf()
  }

  async request (options) {
    await this.prepare()

    const defaults = {
      headers: {
        'X-CSRFToken': this.csrf
      }
    }

    return this.adapter(deepmerge(defaults, options))
  }

  get (uri, options) {
    return this.request({ method: 'GET', uri, ...options })
  }

  post (uri, options) {
    return this.request({ method: 'GET', uri, ...options })
  }
}
