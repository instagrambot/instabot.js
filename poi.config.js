module.exports = () => ({
  title: 'Instabot',
  entry: 'src/renderer/index.js',
  homepage: './',

  extendWebpack(config) {
    config.target('electron-renderer');
  },
});
