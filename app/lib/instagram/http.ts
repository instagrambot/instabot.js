/* eslint-disable no-param-reassign */

import { get } from 'lodash';
import crypto from 'crypto';
import axios from 'axios';
import toFormData from 'object-to-formdata';
import Cookies from '@/lib/instagram/cookies';
import { BASE_URL } from '@/lib/instagram/constants';

const RHX_REGEX = /"rhx_gis":"(.+?)"/;

const X_SET_COOKIE = 'x-set-cookie';
const X_COOKIE = 'x-cookie';
const X_CSRFTOKEN = 'x-csrftoken';
const X_INSTAGRAM_GIS = 'x-instagram-gis';

export default class Http {
  axios = axios.create({ baseURL: BASE_URL })
  cookies = new Cookies();
  rhx: string | undefined

  async prepare() {
    if (!this.cookies.isEmpty()) return;

    const resp = await this.axios.get('/');
    const setCookies = resp.headers[X_SET_COOKIE];

    this.cookies.parse(setCookies);
    this.rhx = get(RHX_REGEX.exec(resp.data), 1);
  }

  prepareOptions(options: any) {
    const opts = { ...options };
    delete opts.jar;

    const path = options.url.replace(/\?.*$/, '');

    const gis = crypto
      .createHash('md5')
      .update(`${this.rhx}:${path}`)
      .digest('hex');

    const headers = {
      [X_CSRFTOKEN]: this.cookies.valueOf('csrftoken'),
      [X_INSTAGRAM_GIS]: gis,
      [X_COOKIE]: this.cookies.toString(),
    };

    if (opts.form) {
      opts.data = toFormData(opts.form);
      delete opts.form;
    }

    return { headers, ...opts };
  }

  async request(options: any = {}) {
    await this.prepare();

    const opts = this.prepareOptions(options);
    const resp = await this.axios(opts);
    const setCookie = resp.headers[X_SET_COOKIE];

    if (options.jar) this.cookies.parse(setCookie);

    return resp;
  }

  get(url: string, options = {}) {
    return this.request({ method: 'GET', url, ...options });
  }

  post(url: string, options = {}) {
    return this.request({ method: 'POST', url, ...options });
  }
}
