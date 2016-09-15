const gulp = require("gulp");
const helpers = require("./helpers");
const open = require("open");
const path = require("path");
const tslint = require("gulp-tslint");
const tslintReporter = require("gulp-tslint-jenkins-reporter");

class Build {
    constructor(config) {
        if(!config) {
            throw new Error("Build.ctor must recieve a non empty config object");
        }

        this.config = config;
    }

    dev() {
        return Promise.resolve()
            .then(this.restoreTypingsClient.bind(this))

            //
            //  Webpack compiles TS files at runtime to this step is not really required
            //  However, we prefer to catch compilation errors before running the dev server
            //
            .then(this.compileClient.bind(this))

            .then(this.restoreTypingsServer.bind(this))
            .then(this.compileServer.bind(this))
            .then(this.lint.bind(this))
            .then(this.runDevServer.bind(this))
            .then(this.runBrowser.bind(this));
    }

    prod() {
        return Promise.resolve()
            .then(this.lint.bind(this))
            .then(this.runWebpack.bind(this))
            .then(this.copyIndexHTML.bind(this))
            .then(this.copyProductionServer.bind(this));
    }

    test() {
        console.log("Running tests");

        return helpers.shellExec("node node_modules/karma/bin/karma start");
    }

    lint() {
        console.log("Running lint");

	    return helpers.buildPromiseFromStream(gulp.src('app/**/*.ts app/**/*.ts app/**/*.tsx server/app.ts'))
            .pipe(tslint())
			.pipe(tslintReporter( {filename: 'build_reports/checkstyle.xml'}))
            .done();
    }

    runDevServer() {
        console.log("Running dev server");

        helpers.shellExec("node server/app.js");

        return Promise.resolve();
    }

    restoreTypingsServer() {
        console.log("Restoring server typings");

        return helpers.shellExec("node ../node_modules/typings/dist/bin.js install", {
            cwd: path.join(this.config.baseDir, "server")
        });
    }

    restoreTypingsClient() {
        console.log("Restoring client typings");

        return helpers.shellExec("node node_modules/typings/dist/bin.js install");
    }

    compileClient() {
        console.log("Compiling client typescript");

        return helpers.shellExec("node node_modules/typescript/bin/tsc --project ./app");
    }

    compileServer() {
        console.log("Compiling server typescript");

        return helpers.shellExec("node node_modules/typescript/bin/tsc --project ./server");
    }

    copyIndexHTML() {
        console.log("Copying index.html");

        return helpers.buildPromiseFromStream(gulp.src("./index.html"))
            .pipe(gulp.dest("dist"))
            .done();
    }

    copyProductionServer() {
        console.log("Copying forProduction.js");

        return helpers.buildPromiseFromStream(gulp.src("./server/forProduction.js"))
            .pipe(gulp.dest("dist"))
            .done();
    }

    runWebpack() {
        console.log("Packaging for production");

        return helpers.shellExec("node node_modules/webpack/bin/webpack.js --config ./build/webpack.config.prod.js");
    }

    runBrowser() {
        console.log("Openning browser");

        open("http://localhost:8080");

        return Promise.resolve();
    }
}

module.exports = Build;
