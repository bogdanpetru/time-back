/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const watchFolders = [
  path.resolve(appDir, '../..', 'node_modules'),
  ...workspaces.filter(
    workspaceDir => !(workspaceDir === appDir),
  ),
];

module.exports = {
  watchFolders,
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
