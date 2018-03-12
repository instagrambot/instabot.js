/* eslint-disable class-methods-use-this */

const { homedir } = require('os');
const { join } = require('path');
const fs = require('fs');
const pify = require('pify');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const mkdir = pify(fs.mkdir);
const stat = pify(fs.stat);

const HOME_DIR = join(homedir(), '.instabot.js');

class Storage {
  constructor({ file, defaults }) {
    this.file = file;
    this.defaults = defaults || {};
  }

  ensureHomeDir() {
    return new Promise((resolve, reject) => {
      stat(HOME_DIR)
        .then(resolve)
        .catch(() => {
          mkdir(HOME_DIR)
            .then(resolve)
            .catch(reject);
        });
    });
  }

  async sync() {
    await this.ensureHomeDir();

    this.adapter = new FileSync(join(HOME_DIR, this.file));
    this.store = low(this.adapter);

    return this.store
      .defaults(this.defaults)
      .write();
  }
}

module.exports = Storage;
