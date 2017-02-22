'use strict';

/**
 * @ngdoc function
 * @name web-parent-app-v2.controller:ChangePasswordCtrl
 * @description
 * # ChangePasswordCtrl
 * Controller of the web-parent-app-v2
 */

define(['app', 'angular', 'azStatusBoard'], function (app, angular) {
    app.controller('ChangePasswordCtrl', ['$scope', '$rootScope', 'passwordStrings', 'passwordApi', '$location', function ($scope, $rootScope, passwordStrings, passwordApi, $location) {
        $scope.strings = passwordStrings;
        $scope.changingPassword = false;
        $scope.changePassword = changePassword;
        //
        function changePassword() {
            Pace.restart();
            console.log("change password");
            if ($scope.newPassword !== $scope.confirmedPassword) {
                console.log("pwd mismatch");
                return;
            }
            passwordApi.changePassword($scope.oldPassword, $scope.newPassword)
                .then(function () {
                    Pace.stop();
                    $rootScope.loggedIn = false;
                    $scope.status.setSuccessMsg(passwordStrings.success);
                }, function (err) {
                    Pace.stop();
                    $scope.status.setErrorMsg(passwordStrings.serverRequestError);
                });
        }
    }]);
    // ...

});

