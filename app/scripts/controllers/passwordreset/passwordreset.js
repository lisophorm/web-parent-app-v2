'use strict';

/**
 * @ngdoc function
 * @name yoAngularifyApp.controller:PasswordresetCtrl
 * @description
 * # PasswordresetCtrl
 * Controller of the yoAngularifyApp
 */

define(['app', 'angular'], function (app, angular) {
    app.controller('PasswordresetCtrl', ["$scope", function ($scope) {
        $scope.title = "Passwordreset page"
    }]);
    // ...
    //or use angular.module to create a new module
});

