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
    "angularScroll"


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
            "routeResolver",
            "lazyLoad",
            "duScroll"


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
        // dynamic strings
        .constant('signupEndStrings', {
            enjoyApp: "GO TO THE AZOOMEE APP AND LOG IN TO GET STARTED!",
            unlimitedMode: "Your family can now enjoy the premium unlimited version of Azoomee.",
            freeTrial: "Enjoy your 15 days FREE on us",
            canCancel: "You can cancel any time.",
            periodFreeWithAzoomee: function (billingCycle, numOfCycles) {
                var messageBody = "Your family can now enjoy the premium, unlimited version of Azoomee for ";
                switch (billingCycle) {
                    case 'BIENNIAL':
                        return messageBody + numOfCycles * 2 + " years!";
                    case 'ANNUAL':
                        return messageBody + numOfCycles + (numOfCycles > 1 ? " years!" : " year");
                    case 'BIANNUAL':
                        return messageBody + numOfCycles * 6 + " months!";
                    case 'MONTHLY':
                        return messageBody + numOfCycles + (numOfCycles > 1 ? " months" : " month");
                }
            },
            thankYouRegistering: "Thanks for signing up.",
            youCanAccessLimitedVersion: "Your family can now enjoy the basic version of Azoomee for free. Upgrade at any time for unlimited access",
            goToApp: "Go to app"
        })
        .constant('totsTooSignupEndStrings', {
            enjoyApp: "Download and log in to get started!",
            unlimitedMode: "Your family now has unlimited access to Azoomee Premium.",
            freeTrial: "Enjoy your 15 days FREE on us",
            canCancel: "You can cancel any time.",
            periodFreeWithAzoomee: function (billingCycle, numOfCycles) {
                var messageBody = "Your family now has unlimited access to Azoomee Premium for ";
                switch (billingCycle) {
                    case 'BIENNIAL':
                        return messageBody + numOfCycles * 2 + " years!";
                    case 'ANNUAL':
                        return messageBody + numOfCycles + (numOfCycles > 1 ? " years!" : " year");
                    case 'BIANNUAL':
                        return messageBody + numOfCycles * 6 + " months!";
                    case 'MONTHLY':
                        return messageBody + numOfCycles + (numOfCycles > 1 ? " months" : " month");
                }
            },
            welcomeToPremium: "Welcome to Azoomee Premium!",
            thankYouRegistering: "Thanks for signing up.",
            youCanAccessLimitedVersion: "Your family can now enjoy the basic version of Azoomee for free. Upgrade at any time for unlimited access",
            goToApp: "Go to app"
        })
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
            ["$rootScope", "$state", "$stateParams", "routeResolver", "userSession",
                function ($rootScope, $state, $stateParams, routeResolver, userSession) {
                    console.log('******** RUN');
                    $rootScope.loggedIn = false;
                    $rootScope.linkJWT = userSession.getJWTUser;
                    if ($rootScope.linkJWT() !== 'undefined') {
                        console.log('******** RUN user is logged in');

                        $rootScope.loggedIn = true;

                    } else {
                        console.log('******** RUN user is NOT logged in');

                        $rootScope.loggedIn = false;
                    }

                    console.log(userSession.getJWTUser());

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
                .state('displayprofile', {
                    url: '/profile/:profileType/:profileId',
                    templateUrl: 'views/profile/displayprofile.html',
                    files: {
                        s: ['rest/userApi']
                    },
                    resolve: {}
                })
                .state('change_pin', {
                    url: '/change_pin',
                    controller: 'ChangePinCtrl',
                    templateUrl: 'views/pin/pinForm.html',
                    files: {
                        s: ['rest/userApi']
                    },
                    resolve: {}
                })
                .state('learnmore', {
                    url: '/learnmore',
                    files: ['first.service'],
                    resolve: {}
                })

                .state('voucherredemption', {
                    url: '/voucherredemption',
                    controller: 'VoucherredemptionCtrl',
                    files: {
                        s: ['first.service', 'rest/loginApi', 'rest/userApi', 'rest/billingApi']
                    },
                    resolve: {}
                })
                .state('subscriptionstatus', {
                    url: '/subscriptionstatus',
                    controller: 'SubscriptionstatusCtrl',
                    files: {
                        s: ['first.service', 'rest/billingApi', 'addcardservice.factory']
                    },
                    resolve: {}
                })
                .state('cardrejection', {
                    url: '/cardrejection',
                    files: ['first.service'],
                    resolve: {}
                })
                .state('addCard', {
                    url: '/addcard',
                    controller: 'AddCardCtrl',
                    files: {
                        s: ['first.service', 'rest/billingApi']
                    },
                    resolve: {}
                })
                .state('signupsubscriptionoffer', {
                    url: '/signup/signupsubscriptionoffer',
                    files: {
                        s: ['first.service', 'rest/billingApi', 'addcardservice.factory']
                    },
                    resolve: {}
                })
                .state('subscriptionOffer', {
                    url: '/subscriptionoffer',
                    files: {
                        s: ['first.service', 'rest/billingApi', 'addcardservice.factory']
                    },
                    controller: 'SubscriptionofferCtrl',
                    resolve: {}
                })
                .state('signupend', {
                    url: '/signup/end',
                    controller: 'SignupendCtrl',
                    files: {
                        s: ['first.service', 'rest/billingApi']
                    },
                    resolve: {}
                })
                .state('resendverification', {
                    url: '/verification/resend',
                    controller: 'ResendVerificationCtrl',
                    files: ['first.service'],
                    resolve: {}
                })
                .state('change_password', {
                    url: '/change_password',
                    controller: 'ChangePasswordCtrl',
                    files: ['first.service'],
                    resolve: {}
                })
                .state('passwordreset', {
                    url: '/passwordReset?token',
                    controller: 'ForgottenPasswordResetCtrl',
                    files: ['first.service'],

                    resolve: {}
                })
                .state('totstoo', {
                    url: '/totstoo',
                    templateUrl: 'views/signup/signup.html',
                    controller: 'SignupCtrl',
                    controllerFile: 'controllers/signup/signup.js',
                    files: {
                        s: ['first.service', 'rest/loginApi', 'rest/billingApi']
                    },
                    resolve: {}
                })
                .state('verification', {
                    url: '/verification?token&reason',
                    files: ['rest/verificationApi'],
                    resolve: {}
                })
                .state('forgotten', {
                    url: '/forgotten',
                    controller: 'ForgottenPasswordCtrl',
                    files: ['first.service'],
                    resolve: {}
                })
                .state('signup', {
                    url: '/signup',
                    files: {
                        s: ['first.service', 'rest/loginApi', 'rest/billingApi']
                    },
                    resolve: {}
                })
                .state('login', {
                    url: '/login?token&reason',
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
    analytics(app); //Attach analytics factory to app
    app.controller('MainCtrl', ['$scope', '$rootScope', 'externalPaths', 'userSession', '$location', '$http', '$q', function ($scope, $rootScope, externalPaths, userSession, $location, $http, $q) {
        console.log('********** MAIN CONTROLLER');
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

        function sessionCallBack() {
            var loggedIn = false;
            console.log("******* CALLBACK USER SESSION TYPE");
            console.log($rootScope.linkJWT());
            if ($rootScope.linkJWT() === 'undefined') {
                console.log('******** user is NOT logged in');

                loggedIn = false;

            } else {
                console.log('******** user is logged in');
                loggedIn = true;

            }
            $rootScope.safeApply(function () {
                console.log('******** SAFE APPLY', loggedIn);
                $rootScope.loggedIn = loggedIn;
            })
        }

        console.log("******* USER SESSION TYPE", userSession.getAuthSession());

        // bloody requireJS too complex using the rest services here
        //
        $rootScope.userUpdated = function () {
            var defer = $q.defer();
            $scope.userID = userSession.getJWTUser();
            console.log('user url:', config.userUrl);
            $http({
                url: config.userUrl + '/adult/' + $scope.userID,
                method: "GET"
            }).then(function (res) {
                console.log('user success', res.data);
                $scope.profileName = res.data.profileName;
                defer.resolve(res);
            }, function (erro) {
                console.log('USER ERROR', erro);
                defer.reject(erro);
            });
            return defer.promise;

        }

        /*     $rootScope.userUpdated = function () {
         return userApi.isUserVerified().then(function (isUserVerified) {
         $rootScope.showVerificationWarning = !isUserVerified;
         }, function () {
         $rootScope.showVerificationWarning = false;
         });
         };*/

        $rootScope.logOut = function () {
            console.log('************ LOGOUT');
            userSession.sessionChanged("", "", true);
            //analytics.sendEvent({ type: "logout" });
            //analytics.clearUserId();
            if (window.trackJs) {
                trackJs.removeMetadata("user");
            }
            //dataStore.clearResources();
            $location.url('/#/login');
        }

    }]);

    return app;
});
