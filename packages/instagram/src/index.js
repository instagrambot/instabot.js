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

  async account (name) {
    const resp = await this.http.get(`/${name}?__a=1`)
    return resp.body
  }

  async follow (userId) {
    const resp = await this.http.post(`/web/friendships/${userId}/follow/`)
    return resp.body
  }

  async unfollow (userId) {
    const resp = await this.http.post(`/web/friendships/${userId}/unfollow/`)
    return resp.body
  }
}
