#!/usr/bin/env node

const WebApi = require('../src/index');
const repl = require('repl');

const r = repl.start('> ');

Object.defineProperty(r.context, 'WebApi', {
  configurable: false,
  enumerable: true,
  value: WebApi,
});

Object.defineProperty(r.context, 'api', {
  configurable: false,
  enumerable: true,
  value: new WebApi(),
});

Object.defineProperty(r.context, 'resolve', {
  configurable: false,
  enumerable: true,
  value: promise => promise.then(console.log), // eslint-disable-line no-console
});
