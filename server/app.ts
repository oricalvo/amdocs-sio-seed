import * as express from "express";
import * as webpack from "webpack";
import * as path from "path";
const webpackConfig = require("../build/webpack.config");
const webpackMiddleware = require("webpack-dev-middleware");

const app = express();

registerWebpackMiddleware();
registerStaticFiles();
registerReturnAlwaysIndexHtml();

app.listen(8080);

function registerReturnAlwaysIndexHtml() {
    app.use(function(req, res, next) {
        res.sendFile(path.join(__dirname, "../index.html"));
    });
}

function registerWebpackMiddleware() {
    let webpackMiddlewareConfig = {
        publicPath: "/",
        stats : {
            chunks : false,
            chunkModules : false,
            colors : true
        },

    };

    //
    //  Assets are created inside memory
    //  path has no meaning
    //
    webpackConfig.output.path = "/";

    let webpackCompiler = webpack(webpackConfig);

    app.use(webpackMiddleware(webpackCompiler, webpackMiddlewareConfig));
}

function registerStaticFiles() {
    let staticPath = path.join(__dirname, "../");
    app.use(express.static(staticPath));
}
