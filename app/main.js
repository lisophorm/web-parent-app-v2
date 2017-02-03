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
        'angularStrapMain': 'lib/angular-strap',
        'angularStrapTpl': 'lib/angular-strap.tpl',
        "ngTouch": 'lib/angular-touch.min',
        "routeResolver": "js/load/route-resolver",
        "jquery": "lib/jquery.min",
        "angularScroll": "lib/angular-scroll",
        "moment": "lib/moment",
        "lazyLoad": "js/load/lazy-load",
        "ngToast": 'lib/ngToast',
        'userSession': 'lib/userSession',
        'httpProviderConfig': 'lib/httpProviderConfig',
        "app": "app",
        "analytics": "js/analytics",
        "addCard": "/js/controllers/addCard/addCard",
        "ThemainCtrl": "js/controllers/themain/themain",
        "azStatusBoard": "/js/directives/azstatusboard",
        'slick-carousel': '/lib/slick',
        'underscore': '/lib/underscore',
        'ModalService': 'lib/angular-modal-service',
        'ModalcontrollerCtrl': "/js/controllers/modalcontroller/modalcontroller",
        'userApi': 'js/services/rest/userApi',
        'anim-in-out': 'lib/anim-in-out',
        'matchMedia': 'lib/match-media'
    },
    optimize: "none",

    shim: {
        "angular": {
            exports: "angular"
        }
        , "uiRouter": {
            deps: ["angular"],
            exports: "uiRouter"
        }, "ngToast": {
            deps: ["angular"],
            exports: "ngToast"
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
        },
        'angularStrapMain': {
            deps: ['angular', 'angularAnimate']
        },
        'angularStrapTpl': {
            deps: ['angular', 'angularStrapMain']
        }
        , "ngTouch": {
            deps: ["angular"],
            exports: "ngTouch"
        }
    },
    waitSeconds: 45,
    map: {
        '*': {
            //angular-strap.tpl requires angular-strap, but any module that requires angular-strap
            // will require both, so the simplest option is that angularStrap *means* angular-strap.tpl
            'angularStrap': 'angularStrapTpl'
        }
    }
});

require(["app"], function () {
    angular.bootstrap(document, ["com.tinizine.azoomee.parent.main"]);
});
