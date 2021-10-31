const path = require('path');


module.exports = {
  entry: './src/index.js',
  ouput: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  }
};
