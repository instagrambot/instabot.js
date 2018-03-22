#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies */

const { app, BrowserWindow } = require('electron');
const poi = require('poi/bin/run');

const devServer = poi({ mode: 'development' });

let main;

function createWindow() {
  main = new BrowserWindow({ width: 800, height: 600 });
  main.loadURL('http://localhost:4000/');
  main.on('closed', () => { main = null; });
}

app.on('ready', () => {
  devServer.then(() => createWindow());
});

app.on('activate', () => {
  if (main === null) createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
