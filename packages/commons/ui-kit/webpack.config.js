const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const path = require('path')

module.exports = {
  entry: ['./assets/src/icons/light/', './assets/src/icons/bold/'],
  output: {
    path: path.resolve(__dirname, './assets/build'),
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId(a) {
                const prefix = a.includes('/bold/') ? 'bold' : 'light'
                const startIndex = a => {
                  const windowsIndex = a.lastIndexOf('\\') + 1
                  const macIndex = a.lastIndexOf('/') + 1

                  return macIndex > 0 ? macIndex : windowsIndex
                }
                const withOutExtension = a.substring(startIndex(a)).replace(/\.[^/.]+$/, '')
                const withSlashes = withOutExtension.replace(/ /g, '-')
                return `icon-${prefix}-${withSlashes.toLowerCase()}`
              },
              extract: true,
              spriteFilename: 'sprite.svg',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new SpriteLoaderPlugin({
      spriteAttrs: {
        id: 'bumeran-icons',
      },
    }),
  ],
  devServer: {
    historyApiFallback: true,
    open: true,
    hot: true,
    stats: 'errors-only',
    overlay: {
      errors: true,
      warnings: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    watchOptions: {
      poll: true,
      ignored: [/node_modules/],
    },
  },
}
