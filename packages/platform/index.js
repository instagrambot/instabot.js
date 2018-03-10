const Storage = require('./storage');

module.exports = class Platform {
  constructor() {
    this.settings = new Storage({ file: 'settings.json' });
  }

  async init() {
    await this.settings.sync();
  }
}
