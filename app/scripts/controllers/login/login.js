'use strict';

/**
 * @ngdoc function
 * @name yoAngularifyApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the yoAngularifyApp
 */

define([
    'app',
    'angular',
    'config'
], function (app, angular, config) {
    app.controller('LoginCtrl',
        ["$scope", "loginApi", 'userSession', '$location', function ($scope, loginApi, userSession, $location) {

            console.log('WITHINB LOGIN CONTROLLER');
            $scope.title = "Login page";

            $scope.submit = function () {
                console.log('LOGIN FUNCTION');
                $scope.loading = true;
                loginApi.login($scope.userId, $scope.pwd)
                    .then(
                        loginSuccess,
                        loginError);
            }

            function loginSuccess() {
                console.log('LOGIN SUCCESS');
                console.log(userSession.getJWTUser());
                $location.url("/home");
                // $location.url("/home");
                //location.href="/home";
                //analytics.updateUserId(userSession.getJWTUser());
                //analytics.sendEvent({ type: 'parentAppLoginSuccess' });
                //$rootScope.userUpdated();
                //var searchParams = $location.search();
                //if (searchParams && searchParams.goto) {
                //$location.url(searchParams.goto);
                // return;
                //}
                //controller.navigateToContacts();
            }

            function loginError(resp) {
                console.log('LOGIN ERROR');
                //analytics.sendEvent({ type: 'parentAppLoginFailure' });
                $scope.loading = false;
                //$scope.loginForm.$setUntouched();
                $scope.pwd = "";
                $scope.errorMsg = "LOGIN ERROR";
            }
        }]);
    // ...
    //or use angular.module to create a new module
});

