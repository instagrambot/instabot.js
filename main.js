/* eslint-disable import/no-extraneous-dependencies */

const { app, BrowserWindow } = require('electron');
const installExtension = require('electron-devtools-installer').default;
const poi = require('poi/bin/run');
const { resolve } = require('path');
const { format } = require('url');

const isProd = process.env.NODE_ENV === 'production';

let window;

function createWindow() {
  window = new BrowserWindow();
  window.setMenu(null);

  if (isProd) {
    window.loadURL(format({
      pathname: resolve('dist/index.html'),
      protocol: 'file',
      slashes: true,
    }));
  } else {
    installExtension({ id: 'fmkadmapgofadopljbjfkapdkoienihi', electron: '^2.0.0' }); // React
    installExtension({ id: 'lmhkpmbekcpmknklioeibfkpmmfibljd', electron: '^2.0.0' }); // Redux

    window.loadURL('http://localhost:4000/');
  }

  window.on('closed', () => { window = null; });
}

app.on('ready', () => {
  if (isProd) {
    createWindow();
  } else {
    poi({ mode: 'development' }).then(() => createWindow());
  }
});

app.on('activate', () => {
  if (window === null) createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
  if (!isProd) process.kill(0, 'SIGINT');
});
