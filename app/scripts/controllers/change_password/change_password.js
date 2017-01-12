'use strict';

/**
 * @ngdoc function
 * @name web-parent-app-v2.controller:ChangePasswordCtrl
 * @description
 * # ChangePasswordCtrl
 * Controller of the web-parent-app-v2
 */

define(['app', 'angular'], function (app, angular) {
    app.controller('ChangePasswordCtrl', ["$scope", function ($scope) {
        $scope.title = "ChangePassword page"
        console.log('within change_password page');
    }]);
    // ...
    //or use angular.module to create a new module
});

