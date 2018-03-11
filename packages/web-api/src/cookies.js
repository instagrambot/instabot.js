/* eslint-disable consistent-return */

const uniqWith = require('lodash/uniqWith');
const uniqBy = require('lodash/uniqBy');
const isEqual = require('lodash/isEqual');
const omit = require('lodash/omit');
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

    const cookies = setCookie
      .map(Cookie.parse)
      .map(cookie => omit(cookie.toJSON(), ['expires', 'creation', 'maxAge']));

    const values = uniqBy([...cookies, ...this.values], 'key');
    this.values = uniqWith(values, isEqual);
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
