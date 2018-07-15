/* eslint-disable import/no-extraneous-dependencies */

const { resolve } = require('path');
const fromPairs = require('lodash/fromPairs');
const pkg = require('./package.json');

const isProd = process.env.NODE_ENV === 'production';
const externals = pkg.externalDependencies.map(v => [v, `require('electron').remote.require("${v}")`]);

module.exports = {
  title: 'Instabot',
  publicPath: './',
  sourceMap: isProd ? false : 'eval-source-map',

  plugins: [
    require('@poi/plugin-typescript')()
  ],

  extendWebpack(config) {
    config.target('electron-renderer');
    config.externals(fromPairs(externals));

    config.node
      .merge({ __dirname: false });

    config.plugins
      .delete('split-vendor-code')
      .delete('split-manifest');

    config.module
      .rule('js')
      .exclude.add(/node_modules/);

    config.resolve.alias
      .set('@', resolve('app'));
  },
};
