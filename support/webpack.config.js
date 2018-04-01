const { resolve, join } = require('path');

const root = resolve(__dirname, '..');

module.exports = {
  resolve: {
    root: [root],
    alias: {
      '@': join(root, 'src'),
    },
  },
};
