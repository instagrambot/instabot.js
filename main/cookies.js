/* eslint-disable consistent-return */

import { uniqBy, omit } from 'lodash';
import { Cookie } from 'tough-cookie';

const INSTAGRAM = 'https://www.instagram.com/';

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

  clear() {
    this.values = [];
  }

  isEmpty() {
    return this.values.length === 0;
  }

  parse(setCookie) {
    const cookies = setCookie
      .map(Cookie.parse)
      .map(cookie => omit(cookie.toJSON(), ['expires', 'creation', 'maxAge']));

    this.values = uniqBy([...cookies, ...this.values], 'key');
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
