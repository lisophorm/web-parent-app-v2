'use strict';

/**
 * @ngdoc function
 * @name yoAngularifyApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the yoAngularifyApp
 */

define(['app', 'angular'], function (app, angular) {
    app.controller('HomeCtrl', ["$scope", "servo01", "factory01", function ($scope, servo01, factory01) {
        $scope.title = "Home page";
        $scope.dummy = servo01.getGreet();
        var tempVar = factory01.someMethod();
        console.log('factory value', tempVar);
    }]);
    // ...
    //or use angular.module to create a new module
});

