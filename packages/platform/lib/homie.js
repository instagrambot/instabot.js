const { homedir } = require('os');
const { join } = require('path');
const merge = require('deepmerge');
const debounce = require('lodash/debounce');

const {
  ensureFileSync,
  readJsonSync,
  writeJson,
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

  constructor(file, defaults = {}) {
    const path = join(ROOT, file);

    ensureFileSync(path);

    const json = readJsonSync(path, { throws: false }) || {};
    const state = merge(defaults, json);

    this.saving = false;
    this.path = path;
    this.state = state;
    this.save = debounce(this.save.bind(this), DEBOUNCE);

    reaction(() => toJS(this.state), this.save);
  }

  toJs() {
    return toJS(this.state);
  }

  save(state) {
    if (this.saving) return Promise.reject();

    this.saving = true;

    try {
      const output = state || toJS(this.state);
      return writeJson(this.path, output);
    } catch (err) {
      return Promise.reject(err);
    } finally {
      this.saving = false;
    }
  }
}

decorate(Homie, { state: observable });

module.exports = Homie;
