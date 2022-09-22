module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = 'electron-renderer';
      config.devtool = 'eval-source-map';
      config.node = {
        __dirname: true,
      }
    }
    config.output.globalObject = 'this'
    return config;
  },
};
