module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      { test: /\.babel$/, use: 'babel-loader' }
    ]
  }
};
