const path = require('path')

// Ver https://storybook.js.org/docs/configurations/custom-webpack-config/ para más info

module.exports = async ({ config, mode }) => {
  const isEnvProduction = mode === 'production'
  /**
   * Esta `rule` es para que los packages de `commons` sean transpilados por babel
   *
   * Puede ser que necesite alguna opción extra
   * Por el momento tiene lo mínimo necesario para funcionar
   */

  config.module.rules.push({
    test: /\.(js|mjs|jsx|ts|tsx)$/,
    include: [path.resolve('../commons/ui-kit')],
    loader: require.resolve('babel-loader'),
    options: {
      customize: require.resolve('babel-preset-react-app/webpack-overrides'),
      presets: [require.resolve('babel-preset-react-app')],
      cacheDirectory: true,
      cacheCompression: isEnvProduction,
      compact: isEnvProduction,
    },
  })

  return config
}
