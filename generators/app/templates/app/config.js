/*jshint esversion: 6 */

import path from 'path';
var rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var _config = {
  development: {
    root: rootPath,
    app: {
      name: '<%= options.appName %>'
    },
    port: 3000,
  },

  test: {
    root: rootPath,
    app: {
      name: '<%= options.appName %>'
    },
    port: 3000,
  },

  production: {
    root: rootPath,
    app: {
      name: '<%= options.appName %>'
    },
    port: 3000,
  }
};

export default config = _config[env];
