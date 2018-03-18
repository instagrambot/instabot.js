const { homedir } = require('os');
const { join } = require('path');
const merge = require('deepmerge');
const debounce = require('lodash/debounce');

const {
  ensureFileSync,
  readJsonSync,
  writeJsonSync,
} = require('fs-extra');

const {
  decorate,
  observable,
  autorun,
} = require('mobx');

const HOME = homedir();
const ROOT = join(HOME, '.instabot');
const DEBOUNCE = 250;

class Homie {
  static get debounce() {
    return DEBOUNCE;
  }

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
    this.save = this.save.bind(this);
    this.save = debounce(this.save, DEBOUNCE);

    autorun(this.save);
  }

  save() {
    writeJsonSync(this.path, this.state);
  }
}

decorate(Homie, { state: observable });

module.exports = Homie;
