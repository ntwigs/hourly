const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  webpack: {
    plugins: {
      remove: ['HtmlWebpackPlugin'],
      add: [
        new HTMLWebpackPlugin(
          Object.assign(
            {},
            {
              hash: false,
              filename: 'index.html',
              template: path.resolve('public', 'index.html'),
              inject: true,
              chunks: ['main'],
            },
            true
              ? {
                  minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                  },
                }
              : undefined
          )
        ),
      ],
    },
    configure: (webpackConfig, { env, paths }) => {
      return {
        ...webpackConfig,
        entry: {
          main: [
            env === 'development' &&
              require.resolve('react-dev-utils/webpackHotDevClient'),
            paths.appIndexJs,
          ].filter(Boolean),
          content: './src/content/index.tsx',
          background: './src/content/background.ts',
        },
        output: {
          ...webpackConfig.output,
          filename: 'static/js/[name].js',
          chunkFilename: 'static/js/[name].chunk.js',
        },
        optimization: {
          ...webpackConfig.optimization,
          runtimeChunk: false,
        },
      }
    },
  },
}
