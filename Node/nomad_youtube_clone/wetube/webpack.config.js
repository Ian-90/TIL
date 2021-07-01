const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const BASE_JS = './src/client/js'

module.exports = {
  mode: 'development',
  watch: true,
  entry: {
    main: `${BASE_JS}main.js`,
    videoPlayer: `${BASE_JS}videoPlayer.js`,
    recorder: `${BASE_JS}recorder.js`,
    commentSection: `${BASE_JS}commentSection.js`,
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'assets'),
    clean: true,
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
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
    ]
  },
  plugins: [new MiniCssExtractPlugin({
    filename: 'css/styles.css'
  })]
}
