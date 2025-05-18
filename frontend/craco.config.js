module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.watchOptions = {
        ignored: ['**/node_modules/**', 'C:/DumpStack.log.tmp'],
      };
      return webpackConfig;
    },
  },
};
