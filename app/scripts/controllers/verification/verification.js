'use strict';

/**
 * @ngdoc function
 * @name web-parent-app-v2.controller:VerificationCtrl
 * @description
 * # VerificationCtrl
 * Controller of the web-parent-app-v2
 */

define(['app', 'angular', 'config'], function (app, angular, config) {
    app.controller('VerificationCtrl', ["$scope", "$stateParams", '$rootScope', 'verificationApi', 'userSession', '$state', 'analytics', function ($scope, $stateParams, $rootScope, verificationApi, userSession, $state, analytics) {
        $scope.title = "Verification page";
        console.log('within verification controller', $stateParams);
        $scope.submitVerification = submitVerification;
        $scope.verificationButtonText = "Activate";
        $scope.message = "Verifying your email";
        $scope.showVerificationButton = true;
        $scope.showRetry = true;

        analytics.sendEvent({type: "verificationPageLoaded"});

        if (typeof $stateParams.token === "undefined") {
            console.log('NO TOKEN');
            verificationFailure(true);
            return;
        }
        // funcs
        function submitVerification() {
            $scope.message = "Verifying your e-mail address now";
            $scope.showVerificationButton = false;
            verificationApi.verify($stateParams.token)
                .then(
                    verificationSuccess,
                    verificationFailure
                );
            $scope.loading = true;
            Pace.start();
        }

        function shouldHideVerification(resp) {
            if (!resp.signupsource) {
                return true;
            }
            return resp.signupsource.toUpperCase() === "IOS_INAPP";
        }

        function verificationSuccess(resp) {
            $scope.success = true;
            $scope.loading = false;
            Pace.stop()
            if (window.fbq) {
                window.fbq('track', 'CompleteRegistration');
            }
            userSession.sessionChanged('verify', resp.parentLoginResponseDTO, true);
            analytics.updateUserId(userSession.getJWTUser());
            analytics.setUserPropertiesOnce({"$first_name": userSession.getJWTUser()});
            analytics.sendEvent({type: "emailVerified"});
            ///$state.search({});
            if (window.isLocalStorageAvailable() && shouldHideVerification(resp)) {
                localStorage.setItem("verificationTimeout", (new Date()).getTime() + (1 * config.apples));
            }
            $rootScope.verificationJourney = true;
            $rootScope.safeApply(function () {
                $rootScope.showVerificationWarning = false;
            });
            $rootScope.userUpdated().then(function () {
                $state.go(config.defaultState);
            });
        }

        function verificationFailure(emptyToken) {
            if (emptyToken === true) {
                analytics.sendEvent({type: "emailVerificationNoToken"});
            } else {
                analytics.sendEvent({type: "emailVerificationFailed"});
            }
            $scope.showVerificationButton = true;
            $scope.verificationButtonText = "Retry";
            $scope.loading = false;
            Pace.stop();
            if (emptyToken && emptyToken.status === 410) {
                $scope.message = "Your e-mail address has already been verified,<br /><a ui-sref='login'>Try logging in now!</a> ";
                $scope.showRetry = false;
            } else {
                $scope.message = "Your e-mail address could not be verified.\nPlease click on the verification link again";
            }
        }
    }]);
    // ...
    //or use angular.module to create a new module
});

