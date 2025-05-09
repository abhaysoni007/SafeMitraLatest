const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync({
    ...env,
    babel: {
      dangerouslyAddModulePathsToTranspile: ['@react-navigation']
    }
  }, argv);
  
  // Customize the config before returning it.
  config.resolve.alias = {
    ...config.resolve.alias,
    'react-native$': 'react-native-web',
  };

  // Update webpack-dev-server configuration
  if (config.devServer) {
    config.devServer = {
      ...config.devServer,
      hot: true,
      port: 8081,
      historyApiFallback: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };
  }

  return config;
}; 