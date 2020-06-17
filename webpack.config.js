const htmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const glob = require('glob')
const path = require('path')
const parts = require('./webpack.parts')
const PATHS = {
  app: path.join(__dirname, 'src')
}
const commonConfig = merge([
  {
    plugins: [new htmlWebpackPlugin({ title: 'hello' })]
  },
  parts.genFonts(),
  parts.loadJavaScript({ include: PATHS.app })
])
const productionConfig = merge([
  parts.extractCSS({
    use: ['css-loader', parts.autoprefix()]
  }),
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true })
  }),
  parts.loadImages({
    options: {
      limit: 15000,
      name: '[name].[ext]'
    }
  }),
  parts.genSprite(),
  parts.clean()
])
const developmentConfig = merge([
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT
  }),
  parts.loadCSS(),
  parts.loadImages(),
  parts.genSprite()
])
module.exports = mode => {
  if (mode === 'production') {
    return merge(commonConfig, productionConfig, { mode })
  }
  return merge(commonConfig, developmentConfig, { mode })
}
