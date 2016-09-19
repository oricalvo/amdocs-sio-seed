const gulp = require("gulp");
const env = require('gulp-env');
const path = require("path");
const configurator = require("./configurator");
const Build = require("./build");

function createBuilder() {
    const baseDir = path.join(__dirname, "..");

    const config = configurator.create({
        baseDir: baseDir,
    });

    return new Build(config);
}

gulp.task('set-env-development',  function () {
  env({
    vars: {
      DEBUG: "app:*,express:*",
      DEBUG_COLORS: true,
      PORT: 8080
    }
  })
});

gulp.task("dev", ['set-env-development'], function() {
    return createBuilder().dev();
});

gulp.task("prod", function() {
    return createBuilder().prod();
});

gulp.task("test", ['set-env-development'], function() {
    return createBuilder().test();
});

gulp.task("lint", function() {
    return createBuilder().lint();
});

gulp.task("compile-client", function() {
    return createBuilder().compileClient();
});

gulp.task("compile-server", function() {
    return createBuilder().compileServer();
});

gulp.task("pack", function() {
    return createBuilder().compileServer();
});
