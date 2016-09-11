const gulp = require("gulp");
const build = require("./build");

gulp.task("dev", function() {
    return build.dev();
});

gulp.task("prod", function() {
    return build.prod();
});

gulp.task("lint", function() {
    return build.lint();
});

gulp.task("webpack", function() {
    return build.runWebpack();
});
