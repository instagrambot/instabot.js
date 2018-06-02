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
      headers.Origin = INSTAGRAM;
      headers.Referer = INSTAGRAM;
      headers['user-agent'] = USER_AGENT;
      headers['x-instagram-ajax'] = 1;
      headers['x-requested-with'] = 'XMLHttpRequest';

      // Allow xhr to set cookies
      headers.Cookie = headers['x-cookie'];
      delete headers['x-cookie'];
    }

    fn({ cancel: false, requestHeaders: headers });
  });

  webRequest.onHeadersReceived((details, fn) => {
    const headers = details.responseHeaders;
    const setCookie = JSON.stringify(headers['set-cookie']);

    if (isInstagram(details.url)) {
      headers['access-control-expose-headers'] = ['x-set-cookie'];
      headers['access-control-allow-headers'] = ['x-csrftoken, x-instagram-gis'];
      headers['access-control-allow-origin'] = ['*'];

      // Allow xhr to read cookies
      headers['x-set-cookie'] = [setCookie];
    }

    fn({ cancel: false, responseHeaders: headers });
  });
};
