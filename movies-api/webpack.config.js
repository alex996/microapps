const nodeExternals = require('webpack-node-externals')
const NodemonPlugin = require('nodemon-webpack-plugin')
const { BannerPlugin } = require('webpack')

module.exports = {
  target: 'node',
  devtool: 'cheap-module-source-map',
  externals: [
    nodeExternals()
  ],
  plugins: [
    new NodemonPlugin(),
    new BannerPlugin({
      raw: true,
      entryOnly: true,
      banner: `require('source-map-support').install();`
    })
  ]
}
