//
//  require.context is a special webpack function
//  it allows us to dynamically decide which files are considered dependency of this file and therefore will
//  be processed by webpack
//  In our case, we search for all app/**/*.spec.ts files
//
const testsContext = require.context('../app', true, /\.spec\.ts[x]?$/)
testsContext.keys().forEach(testsContext);
