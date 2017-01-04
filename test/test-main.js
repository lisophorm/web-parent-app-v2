var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;


var pathToModule = function (path) {
    return path.replace(/^\/base\//, 'http://localhost:9876/base/');
};

Object.keys(window.__karma__.files).forEach(function (file) {
    if (TEST_REGEXP.test(file)) {
        // Normalize paths to RequireJS module names.
        allTestFiles.push(pathToModule(file));
    }
});


requirejs.config({
    baseUrl: "http://localhost:9876/base/build/",
    paths: {
        "angular": "lib/angular",
        "uiRouter": "lib/angular-ui-router",
        "mock": "lib/angular-mocks",
        "ngAnimate": 'lib/angular-animate.min',
        "ngCookies": 'lib/angular-cookies.min',
        "ngResource": 'lib/angular-resource.min',
        "ngSanitize": 'lib/angular-sanitize.min',
        "ngTouch": 'lib/angular-touch.min',
        "routeResolver": "js/load/route-resolver",
        "lazyLoad": "js/load/lazy-load",
        "app": "app"
    },
    shim: {
        "angular": {
            exports: "angular"
        },
        "mock": {
            deps: ["angular"],
            exports: "mock"
        },
        "uiRouter": {
            deps: ["angular"],
            exports: "uiRouter"
        },
        "ngAnimate": {
            deps: ["angular"],
            exports: "ngAnimate"
        },
        "ngCookies": {
            deps: ["angular"],
            exports: "ngCookies"
        },
        "ngResource": {
            deps: ["angular"],
            exports: "ngResource"
        },
        "ngSanitize": {
            deps: ["angular"],
            exports: "ngSanitize"
        },
        "ngTouch": {
            deps: ["angular"],
            exports: "ngTouch"
        }
    },
    // ask Require.js to load these files (all our tests)
    deps: allTestFiles,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});

