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
        "moment": "lib/moment",
        "lazyLoad": "js/load/lazy-load",
        // alan shit
        'userSession': 'lib/userSession',
        'httpProviderConfig': 'lib/httpProviderConfig',
        "app": "app",
        "analytics": "js/analytics",
        "addCard": "/js/controllers/addCard/addCard"
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
    angular.bootstrap(document, ["com.tinizine.azoomee.parent.main"]);
});
