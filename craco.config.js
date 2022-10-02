const HTMLWebpackPlugin = require('html-webpack-plugin')
const CracoAlias = require('craco-alias')
const path = require('path')

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        tsConfigPath: './tsconfig.extend.json',
      },
    },
  ],
  webpack: {
    plugins: {
      remove: ['HtmlWebpackPlugin'],
      add: [
        new HTMLWebpackPlugin({
          hash: false,
          filename: 'index.html',
          template: path.resolve('public', 'index.html'),
          inject: true,
          chunks: ['main'],
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
        }),
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
          content: './src/pages/content/script/index.tsx',
          background: './src/pages/content/script/background.ts',
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
