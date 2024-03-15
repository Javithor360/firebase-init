const path = require('path'); // % Node's core module which gets any folder path wherever it is

// % Exporting an object with the information related to the webpack
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  watch: true
}