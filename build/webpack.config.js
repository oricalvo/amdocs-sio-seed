var webpack = require("webpack");

function getConfig(isTest) {

  //
  //  Set chunk "lib" as a common chunk
  //
  var config = {
    //
    //  Each key creates a new chunk
    //
    entry: {
      lib: [
        "react",
        "react-dom",
        "react-router",
      ],
      app: "./app/main"
    },

    output: {
      path: "./dist",
      filename: "[name].bundle.js"
    },

    resolve: {
      //
      //  default extensions in case of require("./file")
      //
      extensions: ['', '.ts', '.tsx', '.js']
    },

    //
    //  Create source maps
    //
    devtool: 'inline-source-map',

    plugins: [
    ],

    module: {
      loaders: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          query: {
            compilerOptions: {
              //
              //  the root tsconfig is configured to not emit JS files
              //  Webpack by default uses this file
              //  Below is an overwrite to allow JS emiting
              //
              "noEmit": false,
            }
          }
        },
        {
          test: /\.scss$/,
          loaders: [
            //
            //  inject style tag into HTML
            //
            'style',

            //
            //  Handles resources (like images) and add support for CSS modules
            //
            'css?modules&localIdentName=[name]__[local]___[hash:base64:5]',

            //
            //  Compiles SASS
            //
            'sass?sourceMap'
          ]
        },
        {
          test: /\.json$/,
          loader: "json"
        },
      ],
    },
  };

  if (!isTest) {
    var commonChunks = new webpack.optimize.CommonsChunkPlugin({
      names: ["lib"],
    });

    config.plugins.push(commonChunks);
  }

  return config;
}

module.exports = getConfig;
