/* eslint-disable consistent-return */

const request = require('request-promise-native');
const { Cookie } = require('tough-cookie');
const { BASE_URL } = require('./constants');

module.exports = class Cookies {
  constructor(response) {
    this.values = response ? this.fromResponse(response) : [];
  }

  isEmpty() {
    return this.values.length === 0;
  }

  fromResponse(response) {
    const setCookie = response.headers['set-cookie'];

    this.values = setCookie
      .map(Cookie.parse)
      .map(cookie => cookie.toJSON());
  }

  toJar() {
    const jar = request.jar();
    this.values.forEach(x => jar.setCookie(Cookie.fromJSON(x), BASE_URL));
    return jar;
  }

  valueOf(key) {
    const cookie = this.values.find(x => x.key === key);
    if (cookie) return cookie.value;
  }
};
