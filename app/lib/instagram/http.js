import crypto from 'crypto';
import request from 'request-promise-native';
import deepmerge from 'deepmerge';
import { pick, get } from 'lodash';
import Cookies from './cookies';
import { BASE_URL, USER_AGENT } from './constants';

const RHX_REGEX = /"rhx_gis":"(.+?)"/;
const SET_COOKIE = 'set-cookie';

const RESPONSE_DEFAULTS = {
  baseUrl: BASE_URL,
  resolveWithFullResponse: true,
  gzip: true,
  json: true,
  headers: {
    origin: BASE_URL,
    referer: BASE_URL,
    pragma: 'no-cache',
    'user-agent': USER_AGENT,
    'accept-language': 'en-US,en;q=0.9',
    'accept-encoding': 'gzip, deflate, br',
    'cache-control': 'no-cache',
    'x-instagram-ajax': 1,
    'x-requested-with': 'XMLHttpRequest',
  },
};

const reduceResp = resp => pick(resp, ['body', 'headers', 'statusCode']);

export default class Http {
  constructor(options = {}) {
    const { cookies } = options;

    this.cookies = new Cookies(cookies);
    this.rhx = null;
    this.doRequest = request.defaults(RESPONSE_DEFAULTS);
  }

  dump() {
    return {
      rhx: this.rhx,
      cookies: this.cookies.get(),
    };
  }

  load({ rhx, cookies } = {}) {
    this.rhx = rhx;
    this.cookies.set(cookies);
  }

  clear() {
    this.rhx = null;
    this.cookies.clear();
  }

  prepareOptions(options) {
    const path = options.uri.replace(/\?.*$/, '');

    const gis = crypto
      .createHash('md5')
      .update(`${this.rhx}:${path}`)
      .digest('hex');

    const headers = {
      'x-csrftoken': this.cookies.valueOf('csrftoken'),
      'x-instagram-gis': gis,
    };

    const opts = deepmerge({ headers }, options);
    opts.jar = this.cookies.toJar();

    return opts;
  }

  async prepare() {
    if (!this.cookies.isEmpty()) return;

    const resp = await this.doRequest.get('/');

    this.cookies.parse(resp.headers[SET_COOKIE]);
    this.rhx = get(RHX_REGEX.exec(resp.body), 1);
  }

  async request(options = {}) {
    await this.prepare();

    const { jar } = options;
    const opts = this.prepareOptions(options);
    const resp = await this.doRequest(opts);

    if (jar) this.cookies.parse(resp.headers[SET_COOKIE]);
    if (options.resolveWithFullResponse) return resp;

    return reduceResp(resp);
  }

  get(uri, options) {
    return this.request({ method: 'GET', uri, ...options });
  }

  post(uri, options) {
    return this.request({ method: 'POST', uri, ...options });
  }
}
