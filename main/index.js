/* eslint-disable import/no-extraneous-dependencies */

const { app } = require('electron');
const start = require('./start');

const isDev = process.env.NODE_ENV !== 'production';

app.on('ready', () => start());

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
  if (isDev) process.kill(0, 'SIGINT');
});
