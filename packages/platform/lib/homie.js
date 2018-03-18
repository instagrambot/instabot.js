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
  toJS,
  reaction,
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

    const json = readJsonSync(path, { throws: false }) || {};
    const state = merge(defaults, json);

    this.path = path;
    this.state = state;
    this.save = debounce(this.save.bind(this), DEBOUNCE);

    reaction(() => toJS(this.state), this.save);
  }

  save(state) {
    writeJsonSync(this.path, state || toJS(this.state));
  }
}

decorate(Homie, { state: observable });

module.exports = Homie;
