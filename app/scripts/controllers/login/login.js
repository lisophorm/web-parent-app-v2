'use strict';

/**
 * @ngdoc function
 * @name web-parent-app-v2.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the web-parent-app-v2
 */

define([
    'app',
    'angular',
    'config'
], function (app, angular, config) {
    app.controller('LoginCtrl',
        ["$scope", "loginApi", 'userSession', '$location', 'analytics', '$stateParams', "$rootScope", function ($scope, loginApi, userSession, $location, analytics, $stateParams, $rootScope) {
            $rootScope.userUpdated();
            $rootScope.totstoo = false;
            //dataStore.clearResources();
            console.log('LOGIN CONTROLLER');
            $scope.userId = userSession.getJWTUserName();
            $scope.userId = ($scope.userId === "verify") ? "" : $scope.userId;
            $scope.userMessage = false;

            if ($stateParams.reason === "loginSuccess") {
                $scope.userMessage = "You can now login with your new password";
            }
            if ($stateParams.token) {
                $scope.loading = true;
                Pace.restart();
                loginApi.loginUsingToken($scope.userId, $stateParams.token).then(
                    loginSuccess,
                    function (err) {
                        console.log("Error login in with token", err);
                        $scope.loading = false;
                        Pace.stop();
                    }
                );
            }

            $scope.submit = function () {
                console.log('LOGIN FUNCTION');
                $scope.loading = true;
                Pace.start();
                loginApi.login($scope.userId, $scope.pwd)
                    .then(
                        loginSuccess,
                        loginError);
            }

            function loginSuccess() {
                console.log('LOGIN SUCCESS');
                console.log(userSession.getJWTUser());
                $rootScope.userUpdated();
                analytics.updateUserId(userSession.getJWTUser());
                analytics.sendEvent({type: 'parentAppLoginSuccess'});

                // $location.url("/home");
                //location.href="/home";
                analytics.updateUserId(userSession.getJWTUser());
                analytics.sendEvent({type: 'parentAppLoginSuccess'});
                //
                var searchParams = $location.search();
                if (searchParams && searchParams.goto) {
                    $location.url(searchParams.goto);
                    return;
                }
                $location.url("/home");
            }

            function loginError(resp) {
                console.log('LOGIN ERROR');
                analytics.sendEvent({type: 'parentAppLoginFailure'});
                $scope.loading = false;
                Pace.stop();
                //$scope.loginForm.$setUntouched();
                $scope.pwd = "";
                $scope.errorMsg = "LOGIN ERROR";
            }
        }]);
    // ...
    //or use angular.module to create a new module
});

