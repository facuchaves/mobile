const path = require('path')

module.exports.managerWebpack = function managerWebpack(config, options) {
  config.module.rules.push({
    test: /\.(js|mjs|jsx|ts|tsx)$/,
    include: [path.resolve('../commons/ui-kit')],
    loader: require.resolve('babel-loader'),
    options: {
      customize: require.resolve('babel-preset-react-app/webpack-overrides'),
      presets: [require.resolve('babel-preset-react-app')],
    },
  })

  return config
}
module.exports.managerBabel = function managerBabel(config, options) {
  return config
}
module.exports.webpack = function webpack(config, options) {
  return config
}
module.exports.babel = function babel(config, options) {
  return config
}
