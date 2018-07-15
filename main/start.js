/* eslint-disable import/no-extraneous-dependencies */

const { BrowserWindow } = require('electron');
const installExtension = require('electron-devtools-installer').default;
const { resolve } = require('path');
const { format } = require('url');
const Poi = require('poi/lib');
const webRequests = require('./webRequests');

const isDev = process.env.NODE_ENV !== 'production';
const devServer = new Poi('develop');

function createWindow() {
  const window = new BrowserWindow();
  window.setMenu(null);

  webRequests(); // Handle web requests

  if (isDev) {
    installExtension({ id: 'fmkadmapgofadopljbjfkapdkoienihi', electron: '^2.0.0' }); // React
    installExtension({ id: 'lmhkpmbekcpmknklioeibfkpmmfibljd', electron: '^2.0.0' }); // Redux
    window.loadURL('http://localhost:4000/');
  } else {
    window.loadURL(format({
      pathname: resolve('dist/index.html'),
      protocol: 'file',
      slashes: true,
    }));
  }
}

module.exports = () => {
  if (isDev) {
    devServer.run().then(() => createWindow());
  } else {
    createWindow();
  }
};
