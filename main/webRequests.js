/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */

const { session } = require('electron');

const INSTAGRAM = 'https://www.instagram.com/';
const INSTAGRAM_REGEX = /^https?:\/\/www.instagram.com/;
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36';

const isInstagram = url => INSTAGRAM_REGEX.test(url);

module.exports = () => {
  const { webRequest } = session.defaultSession;

  webRequest.onBeforeSendHeaders((details, fn) => {
    const headers = details.requestHeaders;

    if (isInstagram(details.url)) {
      delete headers['x-cookie'];

      headers.Origin = INSTAGRAM;
      headers.Referer = INSTAGRAM;
      headers['User-Agent'] = USER_AGENT;
      headers['Cookie'] = headers['X-Cookie'];
    }

    fn({ cancel: false, requestHeaders: headers });
  });

  webRequest.onHeadersReceived((details, fn) => {
    const headers = details.responseHeaders;
    const setCookie = JSON.stringify(headers['set-cookie']);

    if (isInstagram(details.url)) {
      headers['x-set-cookie'] = [setCookie];
      headers['access-control-expose-headers'] = ['x-set-cookie'];
      headers['access-control-allow-origin'] = ['*'];
    }

    fn({ cancel: false, responseHeaders: headers });
  });
};
