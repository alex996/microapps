const nodeExternals = require('webpack-node-externals')
const NodemonPlugin = require('nodemon-webpack-plugin')

module.exports = {
  target: 'node',
  devtool: 'cheap-source-map',
  externals: [
    nodeExternals()
  ],
  plugins: [
    new NodemonPlugin()
  ]
}
