import os from 'os';
import path from 'path';
import pify from 'pify';
import fs from 'fs';

const stat = pify(fs.stat);
const mkdir = pify(fs.mkdir);

const CONFIG_FOLDER = '.instabot';

export default class Configuration {
  constructor() {
    this.rootDir = path.join(os.homedir(), CONFIG_FOLDER);
    this.bootstrap();
  }

  bootstrap() {
    return new Promise((resolve, reject) => {
      stat(this.rootDir).catch(() => {
        mkdir(this.rootDir).catch(reject);
      });
    });
  }
}
