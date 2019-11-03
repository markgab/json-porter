var path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'porter-test.bundle.js'
  },
  devtool: 'eval-source-map'
};