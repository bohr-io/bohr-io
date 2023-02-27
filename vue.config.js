const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en-us',
      fallbackLocale: 'en-us',
      localeDir: 'locales',
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true
    }
  },
  devServer: {
    host: "0.0.0.0",
    client: {
      webSocketURL: {
        hostname: '0.0.0.0',
        pathname: '/ws',
        port: 443
      },
    },
  },
  css: {
    loaderOptions: {
      css: {
        url: false
      }
    }
  },

  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin({
        languages: ['json', 'sql'],
      })
    ]
  }
}
