const { homedir } = require('os');
const { join } = require('path');
const { ensureDirSync } = require('fs-extra');

const HOME = homedir();
const ROOT = join(HOME, '.instabot');

module.exports = class Nest {
  static get root() {
    return ROOT;
  }

  constructor() {
    ensureDirSync(ROOT);
  }
};
