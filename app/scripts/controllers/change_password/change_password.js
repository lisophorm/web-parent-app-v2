'use strict';

/**
 * @ngdoc function
 * @name web-parent-app-v2.controller:ChangePasswordCtrl
 * @description
 * # ChangePasswordCtrl
 * Controller of the web-parent-app-v2
 */

define(['app', 'angular'], function (app, angular) {
    app.controller('ChangePasswordCtrl', ['$scope', 'passwordStrings', 'passwordApi', '$location', function ($scope, passwordStrings, passwordApi, $location) {
        $scope.strings = passwordStrings;
        $scope.changingPassword = false;
        $scope.changePassword = changePassword;
        //
        function changePassword() {
            console.log("change password");
            if ($scope.newPassword !== $scope.confirmedPassword) {
                console.log("pwd mismatch");
                return;
            }
            passwordApi.changePassword($scope.oldPassword, $scope.newPassword)
                .then(function () {
                    $scope.status.setSuccessMsg(passwordStrings.success);
                }, function (err) {
                    $scope.status.setErrorMsg(passwordStrings.serverRequestError);
                });
        }
    }]);
    // ...
    //or use angular.module to create a new module
});

