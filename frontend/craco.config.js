module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.watchOptions = {
        ignored: [
          'C:/DumpStack.log.tmp',
          /node_modules/,
        ],
      };
      return webpackConfig;
    },
  },
};
