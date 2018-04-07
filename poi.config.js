/* eslint-disable import/no-extraneous-dependencies */

const fromPairs = require('lodash/fromPairs');
const pkg = require('./package.json');

const isProd = process.env.NODE_ENV === 'production';
const externals = pkg.externals.map(v => [v, `require('electron').remote.require("${v}")`]);

module.exports = () => ({
  title: 'Instabot',
  entry: 'src/index.js',
  homepage: './',
  sourceMap: isProd ? false : 'eval-source-map',

  presets: [
    require('poi-preset-babel-minify')({}, { comments: false }),
  ],

  extendWebpack(config) {
    config.target('electron-renderer');
    config.externals(fromPairs(externals));
    config.node.merge({ __dirname: false });

    config.plugins
      .delete('split-vendor-code')
      .delete('split-manifest');

    config.module
      .rule('js')
      .exclude.add(/node_modules/);
  },
});
