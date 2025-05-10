const { getDefaultConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */

const config = getDefaultConfig(__dirname);

// Ensure Metro can resolve asset file extensions
config.resolver.assetExts = [...config.resolver.assetExts, 'jpeg', 'jpg', 'png'];

module.exports = config;
