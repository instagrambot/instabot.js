/* eslint-disable consistent-return */

import { uniqWith, uniqBy, isEqual, omit } from 'lodash';
import request from 'request-promise-native';
import { Cookie } from 'tough-cookie';
import { BASE_URL } from './constants';

export default class Cookies {
  constructor(values = []) {
    this.values = values;
  }

  get() {
    return [...this.values];
  }

  set(values) {
    this.values = [...values];
  }

  isEmpty() {
    return this.values.length === 0;
  }

  fromResponse(response) {
    this.fromHeader(response.headers['set-cookie']);
  }

  fromHeader(cookiesHeader) {
    const cookies = cookiesHeader
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
}
