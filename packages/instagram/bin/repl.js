#!/usr/bin/env node

const repl = require('repl')
const r = repl.start('> ')

Object.defineProperty(r.context, 'Instagram', {
  configurable: false,
  enumerable: true,
  value: require('../index')
})

Object.defineProperty(r.context, 'Http', {
  configurable: false,
  enumerable: true,
  value: require('../http')
})

Object.defineProperty(r.context, 'csrf', {
  configurable: false,
  enumerable: true,
  value: require('../csrf')
})
