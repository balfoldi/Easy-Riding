process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const environment = require('./environment')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = environment.toWebpackConfig()
