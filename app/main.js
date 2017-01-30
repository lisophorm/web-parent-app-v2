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
        "jquery": "/lib/jquery.min",
        "angularScroll": "lib/angular-scroll",
        'angularStrapMain': 'lib/angular-strap',
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
        'userApi': 'js/services/rest/userApi'
    },
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
