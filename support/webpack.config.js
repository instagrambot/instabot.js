const { resolve } = require('path');

module.exports = {
  resolve: {
    root: [root],
    alias: {
      '@': resolve('app'),
    },
  },
};
