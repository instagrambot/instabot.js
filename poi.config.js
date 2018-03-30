/* eslint-disable import/no-extraneous-dependencies */

const isProd = process.env.NODE_ENV === 'production';

module.exports = () => ({
  title: 'Instabot',
  entry: 'src/renderer/index.js',
  homepage: './',
  sourceMap: isProd ? false : 'eval-source-map',

  presets: [
    require('poi-preset-babel-minify')({}, { comments: false }),
  ],

  extendWebpack(config) {
    config.target('electron-renderer');

    config.plugins
      .delete('split-vendor-code')
      .delete('split-manifest');

    config.node.merge({
      __dirname: false,
      __filename: false,
    });

    config.module
      .rule('js')
      .exclude.add(/node_modules/);
  },
});
