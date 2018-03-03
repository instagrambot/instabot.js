const Http = require('./http')

module.exports = class Instagram {
  constructor () {
    this.http = new Http()
  }
}
