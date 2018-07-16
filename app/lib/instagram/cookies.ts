/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */

import { uniqBy } from 'lodash';
import { Cookie } from 'tough-cookie';

export default class Cookies {
  values: any[]

  constructor(values = []) {
    this.values = values;
  }

  get() {
    return [...this.values];
  }

  set(values: any[]) {
    this.values = [...values];
  }

  clear() {
    this.values = [];
  }

  isEmpty() {
    return this.values.length === 0;
  }

  parse(setCookie: string) {
    const items = JSON.parse(setCookie || '[]');
    const cookies = items.map(Cookie.parse);
    this.values = uniqBy([...cookies, ...this.values], 'key');
  }

  toString() {
    return this.values.map(x => `${x.key}=${x.value}`).join('; ');
  }

  toCookies() {
    return this.values.map(x => x.toString());
  }

  valueOf(key: string) {
    const cookie = this.values.find(x => x.key === key);
    if (cookie) return cookie.value;
  }
}
