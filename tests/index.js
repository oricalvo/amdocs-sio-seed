//var testsContext = require.context("../app", true, /_test$/);
const testsContext = require.context('../app', true, /\.spec\.js$/)
testsContext.keys().forEach(testsContext);
