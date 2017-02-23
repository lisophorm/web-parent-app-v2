'use strict';

/**
 * @ngdoc overview
 * @name web-parent-app-v2
 * @description
 * # web-parent-app-v2
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
    "httpProviderConfig",
    "analytics/analytics",
    "strings",
    "angularScroll",
    "ModalService",
    "ngToast",
    'jquery',
    'anim-in-out',
    'matchMedia'



], function (angular, uiRouter, routeResolver, lazyLoad, ngAnimate, ngCookies, ngResource, ngSanitize, ngTouch,
             config, userSession, httpProviderConfig, analytics) {


    var localStorageAvailable = (function () {
        var blah = 'blah',
            available;
        try {
            localStorage.setItem(blah, blah);
            available = localStorage.getItem(blah) === blah;
            localStorage.removeItem(blah);
            return available;
        } catch (e) {
            return false;
        }
    })();

    window.isLocalStorageAvailable = function () {
        return localStorageAvailable;
    };

    if (window.mixpanel) {
        if (window.isLocalStorageAvailable()) {
            mixpanel.init(config.mixPanelToken, {persistence: "localStorage"});
        } else {
            mixpanel.init(config.mixPanelToken);
        }
        mixpanel.track("parentAppLoaded");
    } else {
        console.log('could not load mixpanel in the parent app');
    }

    /**) {
    /**
     * configure the main app module
     * @type {*|module}
     */
    var app = angular.module("com.tinizine.azoomee.parent.main",
        [
            "ngAnimate",
            "com.tinizine.azoomee.parent.strings",
            "ngCookies",
            "ngResource",
            "ngSanitize",
            "ngTouch",
            "ui.router",
            'anim-in-out',
            "routeResolver",
            "lazyLoad",
            "duScroll",
            "angularModalService",
            "ngToast",
            'matchMedia'
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

            $httpProvider.interceptors.push('jwtInterceptor');
        }])
        .constant('externalPaths', [
            '/login', '/login/:reason', '/signup', '/verification', '/verification/resend', '/forgotten', '/passwordReset', '/learnMore'
        ])
        // dynamic strings

        //
        .directive('cookieConsent', ['$cookies', function ($cookies) {
            return {
                scope: {},
                template: '<div id="cookieConsent">' +
                '<div ng-hide="userHasGivenConsent()" class="cookieConsent">' +
                'By continuing to use the site, you agree to the use of cookies.' + ' <a href="' + 'www.google.com' + '" target="_blank">' + 'more' + '</a>' +
                ' <button id="cookieConsentButton" ng-click="storeConsent()">' + 'accept' + '</button>' +
                '</div>' +
                '</div>',
                controller: ['$scope', function ($scope) {
                    var _consent = $cookies.get('azoomeeCookieConsent');
                    $scope.storeConsent = function () {
                        $cookies.put('azoomeeCookieConsent', true);
                        _consent = true;
                    };
                    $scope.userHasGivenConsent = function () {
                        return _consent;
                    };
                }]
            };
        }])
        // ********************
        //
        // form the original project
        .run(
            ["$rootScope", "$state", "$stateParams", "routeResolver", "userSession", "screenSize", "$timeout",
                function ($rootScope, $state, $stateParams, routeResolver, userSession, screenSize, $timeout) {


                    $rootScope.desktop = screenSize.is('md, lg');
                    if ($rootScope.desktop) {
                        $rootScope.animType = "anim-fade";


                        //$state.go("subscriptionstatus");

                    } else {
                        $rootScope.animType = "anim-fade";

                    }
                    $rootScope.loggedIn = false;
                    $rootScope.linkJWT = userSession.getJWTUser;
                    if (typeof $rootScope.linkJWT() === 'undefined') {
                        $rootScope.loggedIn = false;
                    } else if (!$rootScope.linkJWT()) {

                        $rootScope.loggedIn = false;

                    } else if ($rootScope.linkJWT() !== 'undefined') {

                        $rootScope.loggedIn = true;

                    } else {


                        $rootScope.loggedIn = false;
                    }

                    $rootScope.isMobile = screenSize.on('xs, sm', function (isMatch) {

                        $rootScope.screenRes = isMatch;
                    });
                    $rootScope.desktop = screenSize.on('md, lg', function (match) {
                        if (match && $rootScope.animType != "anim-fade") {


                            if ($state.current.name == 'home') {
                                $state.go("subscriptionstatus");


                            }

                        }
                        if (match) {

                            $rootScope.animType = "anim-fade";



                        } else {
                            $rootScope.animType = "anim-fade";


                        }
                        $rootScope.desktop = match;
                    });



                    $rootScope.execDone = function () {

                        setTimeout(function () {


                            $rootScope.doneFunc.apply();
                        }, 0)
                    }

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

            // default controller is RoutenameCtrl unless specified otherwise here
            //
            // ********** STATE NAME must be ALL LOWERCASE
            // url can be camelcase
            //
            $stateProvider
                .state('change_passwordgulp', {
                    url: '/change_passwordgulp',
                    //files: ['first.service'],
                    resolve: {}
                })
                .state('choosepin', {
                    url: '/profile/child/:profileId/choosePinFirst',
                    templateUrl: 'views/signup/choosepin.html',
                    controller: 'ChoosepinCtrl',
                    files: {
                        s: ['rest/userApi']
                    },
                    resolve: {}
                })
                .state('editprofile', {
                    url: '/profile/child/:profileId/edit',
                    controller: "EditprofileCtrl",
                    controllerFile: 'controllers/editprofile.js',

                    files: {
                        s: ['rest/userApi']
                    },
                    templateUrl: 'views/profile/editprofile.html',
                    resolve: {}
                })
                .state('editadultprofile', {
                    url: '/profile/adult/:profileId/edit',
                    controllerFile: 'controllers/editadultprofile.js',

                    controller: 'EditadultprofileCtrl',
                    templateUrl: 'views/profile/editadultprofile.html',
                    files: {
                        s: ['rest/userApi']
                    },
                    resolve: {}
                })
                .state('displayprofile', {
                    url: '/profile/:profileType/:profileId',
                    templateUrl: 'views/profile/displayprofile.html',
                    controllerFile: 'controllers/displayprofile.js',

                    files: {
                        s: ['rest/userApi']
                    },
                    resolve: {}
                })
                .state('change_pin', {
                    url: '/change_pin',
                    controller: 'ChangePinCtrl',
                    controllerFile: 'controllers/change_pin.js',

                    templateUrl: 'views/pin/pinForm.html',
                    files: {
                        s: ['rest/userApi']
                    },
                    resolve: {}
                })
                .state('learnmore', {
                    controllerFile: 'controllers/learnmore.js',

                    url: '/learnmore',
                    //files: ['first.service'],
                    resolve: {}
                })

                .state('voucherredemption', {
                    url: '/voucherredemption',
                    controllerFile: 'controllers/voucherredemption.js',

                    templateUrl: 'views/voucherredemption/voucherredemption.html',
                    controller: 'VoucherredemptionCtrl',
                    files: {
                        s: ['rest/loginApi', 'rest/userApi', 'rest/billingApi']
                    },
                    resolve: {}
                })
                .state('subscriptionstatus', {
                    url: '/subscriptionstatus',
                    controller: 'SubscriptionstatusCtrl',
                    controllerFile: 'controllers/subscriptionstatus.js',

                    files: {
                        s: ['rest/billingApi', 'addcardservice.factory']
                    },
                    resolve: {}
                })
                .state('cardrejection', {
                    url: '/cardrejection',
                    //  files: ['first.service'],
                    resolve: {}
                })
                .state('addCard', {
                    url: '/addcard',
                    controller: 'AddCardCtrl',
                    files: {
                        s: ['rest/billingApi']
                    },
                    resolve: {}
                })
                .state('signupsubscriptionoffer', {
                    url: '/signup/signupsubscriptionoffer',
                    controllerFile: 'controllers/signupsubscriptionoffer.js',
                    files: {
                        s: ['rest/billingApi', 'addcardservice.factory']
                    },
                    resolve: {}
                })
                .state('subscriptionOffer', {
                    url: '/subscriptionoffer',
                    controllerFile: 'controllers/subscriptionOffer.js',
                    files: {
                        s: ['rest/billingApi', 'addcardservice.factory']
                    },
                    controller: 'SubscriptionofferCtrl',
                    resolve: {}
                })
                .state('signupend', {
                    url: '/signup/end',
                    controller: 'SignupendCtrl',
                    controllerFile: 'controllers/signupend.js',

                    files: {
                        s: ['rest/billingApi']
                    },
                    resolve: {}
                })
                .state('resendverification', {
                    url: '/verification/resend',
                    controller: 'ResendVerificationCtrl',
                    controllerFile: 'controllers/resendverification.js',
                    files: {
                        s: ['rest/userApi']
                    },
                    resolve: {}
                })
                .state('change_password', {
                    url: '/change_password',
                    controller: 'ChangePasswordCtrl',
                    controllerFile: 'controllers/change_password.js',

                    files: {
                        s: ['rest/passwordApi']
                    },
                    resolve: {}
                })
                .state('passwordreset', {
                    url: '/passwordReset?token',

                    controller: 'ForgottenPasswordResetCtrl',
                    controllerFile: 'controllers/passwordreset.js',

                    // files: ['first.service'],

                    resolve: {}
                })
                .state('totstoo', {
                    url: '/totstoo',
                    templateUrl: 'views/signup/signup.html',
                    controller: 'SignupCtrl',
                    controllerFile: 'controllers/signup.js',
                    files: {
                        s: ['rest/loginApi', 'rest/billingApi']
                    },
                    resolve: {}
                })
                .state('verification', {
                    url: '/verification?token&reason',
                    files: ['rest/verificationApi'],
                    controller: 'VerificationCtrl',
                    controllerFile: 'controllers/verification.js',

                    resolve: {}
                })
                .state('forgotten', {
                    url: '/forgotten',
                    controller: 'ForgottenPasswordCtrl',

                    controllerFile: 'controllers/forgotten.js',

                    resolve: {}
                })
                .state('signup', {
                    url: '/signup',
                    files: {
                        s: ['rest/loginApi', 'rest/billingApi']
                    },
                    controllerFile: 'controllers/signup.js',

                    resolve: {}
                })
                .state('login', {
                    url: '/login?token&reason',
                    files: {
                        s: ['rest/loginApi']
                    },
                    controllerFile: 'controllers/login.js',

                    resolve: {}
                })
                .state('home', {
                    url: '/home',
                    controllerFile: 'controllers/home.js',


                    resolve: {
                        log: function () {

                        }
                    }
                })

                // ui router modal
                .state("Base", {})

                .state("Modal", {
                    views: {
                        "modal": {
                            templateUrl: "views/modals/ui.router.modal.html"
                        }
                    },
                    onEnter: function ($state) {
                        // Hitting the ESC key closes the modal
                        $(document).on('keyup', function (e) {
                            if (e.keyCode == 27) {
                                $(document).off('keyup')
                                $state.go('Base')
                            }
                        });

                        // Clicking outside of the modal closes it
                        $(document).on('click', '.Modal-backdrop, .Modal-holder', function () {
                            $state.go('Base');
                        });

                        // Clickin on the modal or it's contents doesn't cause it to close
                        $(document).on('click', '.Modal-box, .Modal-box *', function (e) {
                            e.stopPropagation();
                        });
                    },
                    abstract: true
                })

                .state("Modal.confirmAddToCart", {
                    views: {
                        "modal": {
                            templateUrl: "views/modals/confirm.html"
                        }
                    }
                })

                .state("Modal.success", {
                    views: {
                        "modal": {
                            templateUrl: "views/modals/success.html"
                        }
                    }
                });            //
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
    analytics(app); //Attach analytics factory to app
    app.controller('MainCtrl', ['$scope', '$rootScope', 'externalPaths', 'userSession', '$location', '$http', '$q', 'notVerifiedStrings', function ($scope, $rootScope, externalPaths, userSession, $location, $http, $q, notVerifiedStrings) {

        $rootScope.notVerifiedStrings = notVerifiedStrings;

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
        $rootScope.caccamo = "tre";
        userSession.setOnSessionAvailable(sessionCallBack);
        userSession.setOnSessionExpired(sessionCallBack);
        $rootScope.userID = $rootScope.linkJWT();

        // In your main controller
        $rootScope.$on('animStart', function ($event, element, speed) {
            // do something
            console.log("*********** ANIMSTART");
        });

        $rootScope.$on('animEnd', function ($event, element, speed) {
            // do something
            console.log("*********** ANIMEND");

        });

        function sessionCallBack() {
            var loggedIn = false;


            if ($rootScope.linkJWT() === 'undefined') {


                loggedIn = false;

            } else {

                loggedIn = true;

            }
            $rootScope.safeApply(function () {

                $rootScope.loggedIn = loggedIn;
            })
        }



        // bloody requireJS too complex using the rest services here
        //
        $rootScope.userUpdated = function () {
            $scope.userID = userSession.getJWTUser();

            if ($scope.userID === 'undefined' || typeof $scope.userID === 'undefined') {


                $rootScope.loggedIn = false;

                return false;
            }
            $http({
                url: config.userUrl + '/adult/' + $scope.userID,
                method: "GET"
            }).then(function (res) {

                $rootScope.refreshChildProfiles();
                if (res.data.actorStatus == "VERIFIED") {

                    $rootScope.showVerificationWarning = false;

                } else {
                    $rootScope.showVerificationWarning = true;

                }
                $scope.profileName = res.data.profileName;
            }, function (erro) {
                console.log('USER ERROR', erro);
            });

        }

        $rootScope.userUpdated();

        $rootScope.refreshChildProfiles = function () {


            var adultProfileId = userSession.getJWTUser();

            var defer = $q.defer();
            $http({
                method: 'GET',
                url: config.userUrl + '/adult/' + adultProfileId + '/owns',
                params: {
                    expand: 'true',
                    activeOnly: 'true'
                }
            })
                .then(function (result) {


                    $rootScope.safeApply(function () {
                        $rootScope.childProfiles = result.data;


                    })
                }, function (err) {

                    defer.reject(err);
                });
            return defer.promise;
        },

            /*     $rootScope.userUpdated = function () {
             return userApi.isUserVerified().then(function (isUserVerified) {
             $rootScope.showVerificationWarning = !isUserVerified;
             }, function () {
             $rootScope.showVerificationWarning = false;
             });
             };*/

            $rootScope.logOut = function () {

                userSession.sessionChanged("", "", true);
                //analytics.sendEvent({ type: "logout" });
                //analytics.clearUserId();
                if (window.trackJs) {
                    trackJs.removeMetadata("user");
                }
                //dataStore.clearResources();
                $location.url('/#/login');
            }

    }])
        .controller('IsdesktopCtrl', ["$scope", function ($scope) {

            $scope.ginoDesko = "Isdesktop page";
            $scope.isDeskTop = true;
        }]);
    ;

    return app;
});
