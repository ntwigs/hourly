module.exports = {
  webpack: {
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
