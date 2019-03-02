const HtmlWebpackPlugin = require('html-webpack-plugin')

console.log(__dirname)

module.exports = {
  devtool: 'cheap-module-source-map',
  output: {
    filename: '[name].[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
}
