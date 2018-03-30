const request = require('request-promise-native');
const deepmerge = require('deepmerge');
const pick = require('lodash/pick');
const Cookies = require('./cookies');

const { BASE_URL, USER_AGENT } = require('./constants');

const reduceResp = resp => pick(resp, ['body', 'headers', 'statusCode']);

module.exports = class Http {
  constructor() {
    this.cookies = new Cookies();

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
    const headers = {
      'x-csrftoken': this.cookies.valueOf('csrftoken'),
    };

    const opts = deepmerge({ headers }, options);
    opts.jar = this.cookies.toJar();

    return opts;
  }

  async request(options = {}) {
    // Prepare cookies if first request
    if (this.cookies.isEmpty()) {
      const resp = await this.send.get('/');
      this.cookies.fromResponse(resp);
    }

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
};
