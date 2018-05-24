const path = require('path');
module.exports = (options = {}) => ({
  entry: './main.js',
  output: {
    filename: 'scripts.js',
    path: path.resolve(__dirname, 'dist')
  }
})
