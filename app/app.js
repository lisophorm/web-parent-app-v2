'use strict';

/**
 * @ngdoc overview
 * @name yoAngularifyApp
 * @description
 * # yoAngularifyApp
 *
 * Main module of the application.
 */
define([
    "angular",
    "uiRouter",
    "routeResolver",
    "lazyLoad",
    "ngAnimate",
    "ngCookies",
    "ngResource",
    "ngSanitize",
    "ngTouch",
    // added from web-parent-app-v1

    "config",
    "userSession",
    "httpProviderConfig"
], function (angular, uiRouter, routeResolver, lazyLoad, ngAnimate, ngCookies, ngResource, ngSanitize, ngTouch,
             config, userSession, httpProviderConfig) {
    /**) {
    /**
     * configure the main app module
     * @type {*|module}
     */
    var app = angular.module("com.tinizine.azoomee.parent.main", ["ngAnimate", "ngCookies", "ngResource", "ngSanitize", "ngTouch",
        "ui.router",
        "routeResolver",
        "lazyLoad",
        //
        //'com.tinizine.azoomee.userSession'
    ])
    // **********
    //
    // added from Azoomee v1
        .factory('userSession', ['$rootScope', '$injector', '$timeout', function ($rootScope, $injector, $timeout) {
            var session = userSession(
                cloudFrontSessionAvailable,
                cloudFrontSessionToExpire
            );
            return session;

            function cloudFrontSessionAvailable(sessionId) {
                if (!session || !sessionId || !session.getJWTUser()) {
                    return;
                }
                $rootScope.cloudFrontCookieRefreshUrl = config.portHoleUrl + '/pixel/gordon.png?userid=' + session.getJWTUser() + '&sessionid=' + sessionId;
            }

            function cloudFrontSessionToExpire() {
                $timeout(function () {          //This is guaranteed to be invoked only after the whole injection dependency initialization is finished, preventing a circular dependency
                    var $http = $injector.get('$http');  //Delay injection until this point
                    if ($rootScope.loggedIn) {
                        $http.get(config.cloudFrontSessionRefreshUrl)
                            .then(function (resp) {
                                session.updateAuthSession(resp.data.expiry, resp.data.sessionId);
                            }, function (err) {
                                console.log("Error while refreshing cloudFront session", err);
                            });
                    }
                });
            }
        }])
        .factory('jwtInterceptor', ['userSession', '$injector', '$location', function (userSession, $injector, $location) {
            console.log('I am within the declaration of jwtInterceptor ');
            var shouldRedirectToLogin = function () {
                    var currentPath = $location.path(),
                        noRedirectPaths = [
                            '/login',
                            '/signup',
                            '/forgotten',
                            '/passwordReset',
                            '/totstoo',
                            '/verification'
                        ],
                        shouldRedirect = true,
                        x;
                    for (x = 0; x < noRedirectPaths.length; x++) {
                        if (currentPath.indexOf(noRedirectPaths[x]) > -1) {
                            shouldRedirect = false;
                            x = noRedirectPaths.length;
                        }
                    }
                    return shouldRedirect;

                },
                handleRejection = function (rejection) {
                    var authRedirect = '/login/',
                        currentPath = $location.path();
                    if (rejection && rejection.status) {
                        if (shouldRedirectToLogin()) {
                            $location.path(authRedirect);
                            $location.search('goto', encodeURIComponent(currentPath));
                        }

                    }
                };
            return $injector.invoke(httpProviderConfig({
                permissionPage: config.permissionPage,
                authPage: config.authPage,
                publicUrls: [
                    config.baseUrl + '/user/v2/adult/verify',
                    config.userUrl + '/v2/adult',
                    config.authUrl + "/login",
                    config.authUrl + "/passwordReset",
                    config.authUrl + "/requestPasswordReset",
                    config.authUrl + "/transferSession/token",
                    config.userUrl + "/requestVerificationEmail"
                ],
                permissionErrorCallback: handleRejection,
                authErrorCallback: handleRejection

            }, userSession).getInterceptorFactory());
        }])
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push(function () {
                return ['$q', '$rootScope', function ($q, $rootScope) {
                    return {
                        'request': function (config) {
                            config.headers['X-AZ-INAPP'] = $rootScope.inApp === true ? 'TRUE' : 'FALSE';

                            return config;
                        },
                        'responseError': function (response) {
                            var headers = response.headers('Content-Type') || {};
                            try {
                                headers = JSON.stringify(headers);
                            }
                            finally {
                                //this line means the qid can be shown in track js logs
                                console.log("Known headers are: " + headers);
                            }
                            return $q.reject(response);
                        }
                    };
                }];

            }());
        }])
        .config(['$httpProvider', function ($httpProvider) {
            console.log('inietto qui');
            $httpProvider.interceptors.push('jwtInterceptor');
        }])
        .constant('externalPaths', [
            '/login', '/login/:reason', '/signup', '/verification', '/verification/resend', '/forgotten', '/passwordReset', '/learnMore'
        ])
        // ********************
        //
        // form the original project
        .run(
            ["$rootScope", "$state", "$stateParams", "routeResolver",
                function ($rootScope, $state, $stateParams, routeResolver) {
                    $rootScope.$state = $state;
                    $rootScope.$stateParams = $stateParams;
                    $rootScope.$on("$stateChangeStart", function (e, target) {
                        routeResolver.route.wrapResolve(target);
                    });
                }
            ])
        .config(["$interpolateProvider", "$stateProvider", "$urlRouterProvider", "$controllerProvider", "$compileProvider", "$filterProvider", "$provide", "$lazyLoadProvider", function ($interpolateProvider, $stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $lazyLoadProvider) {

            /**
             * configure the ocLazyLoader to use requireJS as the loader
             */
            $interpolateProvider.startSymbol('{[{').endSymbol('}]}');

            $lazyLoadProvider.config({
                asyncLoader: require
            });

            /**
             * override angular default module api for creating components
             * @type {Function|register|register|register}
             */
            app.controller = $controllerProvider.register;
            app.service = $provide.service;
            app.factory = $provide.factory;
            app.filter = $filterProvider.register;
            app.directive = $compileProvider.directive;

            /**
             * get referance to the route method of routeResolverProvider
             * @type {*}
             */
            $urlRouterProvider
                .otherwise('/login');

            $stateProvider
                .state('totstoo', {
                    url: '/totstoo',
                    files: ['first.service'],
                    resolve: {}
                })
                .state('resendVerification', {
                    url: '/verification/resend',
                    files: ['first.service'],
                    resolve: {}
                })
                .state('verification', {
                    url: '/verification',
                    files: ['first.service'],
                    resolve: {}
                })
                .state('passwordReset', {
                    url: '/passwordreset',
                    files: ['first.service'],
                    resolve: {}
                })
                .state('forgotten', {
                    url: '/forgotten',
                    files: ['first.service'],
                    resolve: {}
                })
                .state('signup', {
                    url: '/signup',
                    files: ['first.service'],
                    resolve: {}
                })
                .state('login', {
                    url: '/login',
                    files: {
                        s: ['first.service', 'rest/loginApi']
                    },
                    resolve: {}
                })
                .state('home', {
                    url: '/home',
                    files: {
                        s: ['factory01.factory', 'first.service', 'servo01'],
                        d: ['tickyTag']
                    },
                    resolve: {
                        log: function () {
                            console.log('try here');
                        }
                    }
                })
                .state('about', {
                    url: '/about',
                    files: {
                        s: ['first.service', 'servo01']
                    },
                    resolve: {} //the default value  {}
                })
        }]);

    angular.module('com.tinizine.azoomee.userSession', [])
        .factory('userSession', ['$rootScope', '$injector', '$timeout', function ($rootScope, $injector, $timeout) {
            var session = userSession(
                cloudFrontSessionAvailable,
                cloudFrontSessionToExpire
            );
            return session;

            function cloudFrontSessionAvailable(sessionId) {
                if (!session || !sessionId || !session.getJWTUser()) {
                    return;
                }
                $rootScope.cloudFrontCookieRefreshUrl = config.portHoleUrl + '/pixel/gordon.png?userid=' + session.getJWTUser() + '&sessionid=' + sessionId;
            }

            function cloudFrontSessionToExpire() {
                $timeout(function () {          //This is guaranteed to be invoked only after the whole injection dependency initialization is finished, preventing a circular dependency
                    var $http = $injector.get('$http');  //Delay injection until this point
                    if ($rootScope.loggedIn) {
                        $http.get(config.cloudFrontSessionRefreshUrl)
                            .then(function (resp) {
                                session.updateAuthSession(resp.data.expiry, resp.data.sessionId);
                            }, function (err) {
                                console.log("Error while refreshing cloudFront session", err);
                            });
                    }
                });
            }
        }]);

    app.controller('MainCtrl', ['$scope', '$rootScope', 'externalPaths', 'userSession', '$location', function ($scope, $rootScope, externalPaths, userSession, $location) {
        console.log('********** MAIN CONTROLLER');
        $rootScope.gino = 4;
        $rootScope.safeApply = function (fn) {
            var phase = this.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };

        $rootScope.logOut = function () {
            console.log('************ LOGOUT');
            userSession.sessionChanged("", "", true);
            //analytics.sendEvent({ type: "logout" });
            //analytics.clearUserId();
            //if (window.trackJs) {
            //trackJs.removeMetadata("user");
            //}
            //dataStore.clearResources();
            $location.url('/#/login');
        }

    }]);

    return app;
});
