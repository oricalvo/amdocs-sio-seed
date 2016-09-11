const gulp = require("gulp");
const build = require("./build");

gulp.task("dev", function() {
    return build.dev();
});

gulp.task("prod", function() {
    return build.prod();
});

gulp.task("test", function() {
    return build.test();
});

gulp.task("lint", function() {
    return build.lint();
});

gulp.task("webpack", function() {
    return build.runWebpack();
});

gulp.task("ts", function() {
    return build.compileTS();
});
