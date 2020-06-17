const miniCssExtractPlugin = require('mini-css-extract-plugin')
const PurifyCSSPlugin = require('purifycss-webpack')
const webpackSpriteSmith = require('webpack-spritesmith')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
exports.devServer = ({ host, post } = {}) => {
  return {
    devServer: {
      open: true,
      overlay: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          pathRewrite: { '^/api': '' }
        }
      }
      // host: process.env.HOST,
      // port: 3000
    }
  }
}
exports.purifyCSS = ({ paths }) => ({
  plugins: [new PurifyCSSPlugin({ paths })]
})
exports.extractCSS = ({ include, exclude, use = [] } = {}) => {
  const plugin = new miniCssExtractPlugin({
    filename: '[name].css'
  })
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,
          use: [miniCssExtractPlugin.loader].concat(use)
        }
      ]
    },
    plugins: [plugin]
  }
}
exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => [require('autoprefixer')()]
  }
})
exports.loadCSS = ({ include, exclude } = {}) => {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,
          use: ['style-loader', 'css-loader']
        }
      ]
    }
  }
}

exports.loadImages = ({ include, exclude, options } = {}) => {
  return {
    module: {
      rules: [
        {
          test: /\.(png|jpg)$/,
          include,
          exclude,
          use: {
            loader: 'url-loader',
            options
          }
        }
      ]
    }
  }
}
exports.genSprite = () => {
  return {
    plugins: [
      new webpackSpriteSmith({
        src: {
          cwd: path.resolve(__dirname, 'src/ico'),
          glob: '*.png'
        },
        target: {
          image: path.resolve(__dirname, 'src/spritesmithgenerate/sprite.png'),
          css: path.resolve(__dirname, 'src/spritesmithgenerate/sprite.scss')
        },
        apiOptions: {
          cssImageRef: '~sprite.png'
        }
      })
    ]
  }
}
exports.genFonts = () => {
  return {
    module: {
      rules: [
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]'
            }
          }
        }
      ]
    }
  }
}
exports.loadJavaScript = ({ include, exclude } = {}) => {
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          include,
          exclude,
          use: 'babel-loader'
        }
      ]
    }
  }
}
exports.clean = () => {
  return {
    plugins: [new CleanWebpackPlugin()]
  }
}
