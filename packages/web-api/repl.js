#!/usr/bin/env node

const WebApi = require('./src/index');

global.WebApi = WebApi;
global.api = new WebApi();
