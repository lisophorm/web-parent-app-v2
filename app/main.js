"use strict";


require.config({
    baseUrl: "build",
    paths: {
        "angular": "lib/angular.min",
        "uiRouter": "lib/angular-ui-router.min",
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
        }
        , "uiRouter": {
            deps: ["angular"],
            exports: "uiRouter"
        }
        , "ngAnimate": {
            deps: ["angular"],
            exports: "ngAnimate"
        }
        , "ngCookies": {
            deps: ["angular"],
            exports: "ngCookies"
        }
        , "ngResource": {
            deps: ["angular"],
            exports: "ngResource"
        }
        , "ngSanitize": {
            deps: ["angular"],
            exports: "ngSanitize"
        }
        , "ngTouch": {
            deps: ["angular"],
            exports: "ngTouch"
        }
    }
});

require(["app"], function () {
    angular.bootstrap(document, ["yoAngularifyApp"]);
});
