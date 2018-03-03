const Http = require('./http')

module.exports = class Instagram {
  constructor () {
    this.http = new Http()
  }

  async login (username, password) {
    const resp = await this.http.post('/accounts/login/ajax/', {
      jar: true,
      form: { username, password }
    })

    return resp.body
  }
}
