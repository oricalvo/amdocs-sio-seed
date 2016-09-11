const gulp = require("gulp");
const build = require("./build");

gulp.task("lint", function() {
    return build.lint();
});

gulp.task("prod", function() {
    return build.prod();
});
