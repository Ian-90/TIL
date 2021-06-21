const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/client/main.js',
  output: {
    filename: 'main.js',
    path: path.resolove(__dirname, 'assets', 'js'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }]
            ]
          }
        }
      }
    ]
  }
}
