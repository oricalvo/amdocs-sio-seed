const gulp = require("gulp");
const helpers = require("./helpers");

function lint() {
    console.log("Running lint");

    return helpers.shellExec("node node_modules/tslint/bin/tslint app/**/*.ts app/**/*.tsx server/**/*.ts");
}

function prod() {
    return Promise.resolve()
        .then(lint)
        .then(runWebpack)
        .then(copyIndexHTML)
        .then(copyProductionServer);
}

function copyIndexHTML() {
    console.log("Copying index.html");

    return helpers.buildPromise(gulp.src("./index.html"))
        .pipe(gulp.dest("dist"))
        .done();
}

function copyProductionServer() {
    console.log("Copying forProduction.js");

    return helpers.buildPromise(gulp.src("./server/forProduction.js"))
        .pipe(gulp.dest("dist"))
        .done();
}

function runWebpack() {
    console.log("Packaging for production");

    return helpers.shellExec("node ../node_modules/webpack/bin/webpack.js --config ../build/webpack.config.js", {
        cwd: "F:\\Projects\\React\\Seed\\server"
    });
}

module.exports = {
    lint: lint,
    prod: prod,
};
