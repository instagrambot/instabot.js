module.exports = () => ({
  title: 'Instabot',
  entry: 'src/index.js',
  homepage: './',

  extendWebpack(config) {
    config.target('electron-renderer');
  },
});
