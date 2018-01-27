/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: 'src/index.jsx',
  sourceMap: isProd ? false : 'source-map',
  homepage: './',
  karma: {
    frameworks: ['jasmine'],
    browsers: ['Electron'],
    reporters: ['spec', 'kjhtml'],
    proxies: {},
  },
  extendWebpack(config) {
    config.target('electron-renderer');
  },
  presets: [
    require('poi-preset-react')(),
    require('poi-preset-karma')({
      files: ['./karma.js'],
    }),
  ],
};
