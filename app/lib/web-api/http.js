import crypto from 'crypto';
import request from 'request-promise-native';
import deepmerge from 'deepmerge';
import { pick, get } from 'lodash';
import Cookies from './cookies';
import { BASE_URL, USER_AGENT } from './constants';

const RHX_REGEX = /"rhx_gis":"(.+?)"/;

const reduceResp = resp => pick(resp, ['body', 'headers', 'statusCode']);

export default class Http {
  constructor(options = {}) {
    const { cookies } = options;

    this.cookies = new Cookies(cookies);
    this.rhx = null;

    this.send = request.defaults({
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
    });
  }

  optionsFrom(options) {
    const path = options.uri.replace(/\?.*$/, '');
    const gis = crypto.createHash('md5').update(`${this.rhx}:${path}`).digest('hex');

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

    const resp = await this.send.get('/');

    this.cookies.fromResponse(resp);
    this.rhx = get(RHX_REGEX.exec(resp.body), 1);
  }

  async request(options = {}) {
    await this.prepare();

    const { jar } = options;
    const opts = this.optionsFrom(options);
    const resp = await this.send(opts);

    if (jar) this.cookies.fromResponse(resp);

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
