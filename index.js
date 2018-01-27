/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */

const electron = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const url = require('url');

const { app, BrowserWindow } = electron;
let mainWindow;

const createWindow = (target) => {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadURL(target);
};

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('ready', () => {
  if (isDev) {
    const poi = require('poi/bin/run');
    poi({ mode: 'development' }).then(() => createWindow('http://localhost:4000/'));
  } else {
    const target = url.format({
      pathname: path.join(__dirname, 'dist', 'index.html'),
      protocol: 'file:',
      slashes: true,
    });

    createWindow(target);
  }
});
