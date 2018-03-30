/* eslint-disable import/no-extraneous-dependencies */

require('given2/setup');

global.moment = () => new Promise(resolve => setImmediate(resolve));
