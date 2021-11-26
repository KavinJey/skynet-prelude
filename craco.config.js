const path = require("path");
const fs = require("fs");

const rewireBabelLoader = require("craco-babel-loader-plugin");

// helpers

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  plugins: [{ plugin: require('@semantic-ui-react/craco-less') },  { plugin: rewireBabelLoader, 
          options: { 
            includes: [resolveApp("node_modules/kokoro-player")], //put things you want to include in array here
            excludes: [/(node_modules|bower_components)/] //things you want to exclude here
            //you can omit include or exclude if you only want to use one option
          }
        }],
}