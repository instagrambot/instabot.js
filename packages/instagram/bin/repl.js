#!/usr/bin/env node

const Instagram = require('../src/index')
const repl = require('repl')
const r = repl.start('> ')

Object.defineProperty(r.context, 'Instagram', {
  configurable: false,
  enumerable: true,
  value: Instagram
})

Object.defineProperty(r.context, 'ig', {
  configurable: false,
  enumerable: true,
  value: new Instagram()
})
