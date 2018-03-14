const { homedir } = require('os');
const { join } = require('path');
// const fs = require('fs-extra');
const define = require('define-property');

const DEFAULT_FOLDER = join(homedir(), '.instabot.js');

module.exports = class Nest {
  constructor(options = {}) {
    const path = options.path || DEFAULT_FOLDER;
    define(this, 'path', path);
  }
};
