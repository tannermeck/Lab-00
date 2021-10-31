const path = require('path');

module.exports = {
  entry: './entry.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  }
};
