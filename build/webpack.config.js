var webpack = require("webpack");

//
//  Set chunk "lib" as a common chunk
//
var commonChunks = new webpack.optimize.CommonsChunkPlugin({
    names: ["lib"],
});

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
        app: "../main"
    },

    output:
    {
        path: "../dist",
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
    devtool: 'source-map',

    plugins: [
        commonChunks,
    ],

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
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

module.exports = config;
