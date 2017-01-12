'use strict';

/**
 * @ngdoc function
 * @name yoAngularifyApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the yoAngularifyApp
 */

define(['app', 'angular'], function (app, angular) {
    app.controller('SignupCtrl', ["$scope", function ($scope) {
        $scope.title = "Signup page"
    }]);
    // ...
    //or use angular.module to create a new module
});

