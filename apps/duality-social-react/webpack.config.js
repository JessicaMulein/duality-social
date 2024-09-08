const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`

  // // Add verbose logging
  // config.stats = {
  //   all: true, // Enable all logging
  //   warnings: true,
  //   errors: true,
  //   logging: 'verbose',
  // };

  return config;
});
