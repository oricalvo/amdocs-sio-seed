const gulp = require("gulp");
const helpers = require("./helpers");
const open = require("open");
const tslint = require("gulp-tslint");
const tslintReporter = require("gulp-tslint-jenkins-reporter");
 


function dev() {
    return Promise.resolve()
        .then(restoreTypings)
        .then(compileTS)
        .then(runDevServer)
        .then(runBrowser);
}

function prod() {
    return Promise.resolve()
        .then(lint)
        .then(runWebpack)
        .then(copyIndexHTML)
        .then(copyProductionServer);
}

function test() {
    console.log("Running test");

    return helpers.shellExec("node node_modules/karma/bin/karma start");
}

function lint() {
    console.log("Running lint");
	return gulp.src('app/**/*.ts app/**/*.ts app/**/*.tsx server/**/*.ts')
        .pipe(tslint())
        .pipe(tslintReporter());
}

function runDevServer() {
    console.log("Running dev server");

    helpers.shellExec("node server/app.js");

    return Promise.resolve();
}

function restoreTypings() {
    console.log("Restoring typings");

    return helpers.shellExec("node node_modules/typings/dist/bin.js install");
}

function compileTS() {
    console.log("Compiling typescript");

    return helpers.shellExec("node node_modules/typescript/bin/tsc");
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

    return helpers.shellExec("node node_modules/webpack/bin/webpack.js --config ./build/webpack.config.prod.js");
}

function runBrowser() {
    console.log("Openning browser");

    open("http://localhost:8080");

    return Promise.resolve();
}

module.exports = {
    dev: dev,
    prod: prod,
    test: test,
    lint: lint,
    runWebpack: runWebpack,
    compileTS: compileTS,
};
