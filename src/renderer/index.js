import { injectGlobal } from 'emotion';
import React from 'react';
import { render } from 'react-dom';
import Instabot from './components/Instabot';
import WebApi from '../lib/web-api';

global.api = new WebApi();

injectGlobal(`
  *, *::after, *::before {
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
  }

  #app {
    width: 100%;
    height: 100%;
  }
`);

render(<Instabot />, document.getElementById('app'));
