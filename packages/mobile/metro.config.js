const path = require('path');
const getWorkspaces = require('get-yarn-workspaces');

const watchFolders = [
  path.resolve(__dirname, '../..', 'node_modules'),
  ...getWorkspaces(__dirname).filter(
    (workspaceDir) => !(workspaceDir === __dirname),
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
