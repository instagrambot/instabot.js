const request = require('request-promise-native')
const deepmerge = require('deepmerge')
const { Cookie } = require('tough-cookie')

const BASE_URL = 'https://www.instagram.com/'

const adapter = request.defaults({
  baseUrl: BASE_URL
})

module.exports = class Http {
  async prepare () {
    const cookies = await adapter
      .get('/', { resolveWithFullResponse: true })
      .then(resp => resp.headers['set-cookie'] || [])
      .then(cookies => cookies.map(Cookie.parse))

    const csrf = cookies.find(x => x.key === 'csrftoken')

    if (csrf) this.csrf = csrf.value
  }

  async request (options) {
    await this.prepare()

    const defaults = {
      headers: {
        'X-CSRFToken': this.csrf,
        Referer: BASE_URL
      }
    }

    return adapter(deepmerge(defaults, options))
  }

  get (uri, options) {
    return this.request({ method: 'GET', uri, ...options })
  }

  post (uri, options) {
    return this.request({ method: 'GET', uri, ...options })
  }
}
