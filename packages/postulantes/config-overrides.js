const path = require('path')

const { homepage } = require(path.resolve('./package.json'))

module.exports = {
  webpack(config, env) {
    if (process.env.REACT_APP_SITE_ID) {
      config.output.path = getSitePath()
    }

    if (!config.resolve.modules) {
      config.resolve.modules = []
    }

    config.resolve.modules.push(path.resolve('../commons/ui-kit'))

    config.module.rules.push({
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      include: [path.resolve('../commons/ui-kit')],
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/react'],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            [
              'babel-plugin-styled-components',
              {
                minify: false,
                transpileTemplateLiterals: false,
                pure: true,
              },
            ],
          ],
        },
      },
    })

    return config
  },
  jest(config) {
    if (!config.testResultsProcessor) {
      config.testResultsProcessor = 'jest-sonar-reporter'
    }

    return config
  },
  paths(paths) {
    const { appPath } = paths
    return {
      ...paths,
      appBuild: process.env.REACT_APP_SITE_ID ? getSitePath() : path.join(appPath, 'build'),
    }
  },
}

function getSitePath() {
  const sitePaths = {
    BMAR: 'bumeran.com.ar',
    BMCL: 'laborum.cl',
    BMEC: 'multitrabajos.com',
    BMMX: 'bumeran.com.mx',
    BMPA: 'konzerta.com',
    BMPE: 'bumeran.com.pe',
    BMVE: 'bumeran.com.ve',
    ZJAR: 'zonajobs.com.ar',
  }

  return path.resolve(`./dist/${sitePaths[process.env.REACT_APP_SITE_ID]}`)
}
