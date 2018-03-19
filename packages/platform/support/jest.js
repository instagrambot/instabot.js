/* eslint-disable import/no-extraneous-dependencies */

require('given2/setup');

global.moment = (t = 0) => new Promise(resolve => setTimeout(resolve, t));
