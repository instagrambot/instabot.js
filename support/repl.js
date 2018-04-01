/* eslint-disable no-console */

import WebApi from '@/lib/web-api';

let lastAwait = null;

if (process.env.NODE_ENV !== 'production') {
  Object.defineProperty(window, '$await', {
    set: (promise) => {
      promise.then((result) => {
        lastAwait = result;
        console.log(lastAwait);
      });

      promise.catch(err => console.error(err));
    },

    get: () => lastAwait,
  });

  window.$repl = {
    api: new WebApi(),
  };
}
