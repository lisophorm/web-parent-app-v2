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
        ["$scope", "loginApi", 'userSession', '$location', 'analytics', '$stateParams', "$rootScope", "loginStrings", function ($scope, loginApi, userSession, $location, analytics, $stateParams, $rootScope, loginStrings) {
            $rootScope.userUpdated();
            $rootScope.totstoo = false;
            //dataStore.clearResources();
            $scope.strings = loginStrings;


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

                        $scope.loading = false;
                        Pace.stop();
                    }
                );
            }

            $scope.submit = function () {

                $scope.loading = true;
                Pace.restart();
                loginApi.login($scope.userId, $scope.pwd)
                    .then(
                        loginSuccess,
                        loginError);
            }

            function loginSuccess() {
                Pace.stop();


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
                $location.url("/profile/adult/" + userSession.getJWTUser());
            }

            function loginError(resp) {

                analytics.sendEvent({type: 'parentAppLoginFailure'});
                $scope.loading = false;
                Pace.stop();
                //$scope.loginForm.$setUntouched();
                $scope.pwd = "";
                $scope.errorMsg = "LOGIN ERROR";
            }
        }]);
    // ...

});

