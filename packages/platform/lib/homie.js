const { homedir } = require('os');
const { join } = require('path');
const { ensureFileSync, readJsonSync } = require('fs-extra');
const merge = require('deepmerge');

const HOME = homedir();
const ROOT = join(HOME, '.instabot');

module.exports = class Homie {
  static get root() {
    return ROOT;
  }

  constructor(file, options = {}) {
    const defaults = options.defaults || {};
    const path = join(ROOT, file);

    ensureFileSync(path);

    const json = readJsonSync(path, { throws: false });
    const state = merge(json, defaults);

    this.path = path;
    this.state = state;
  }
};
