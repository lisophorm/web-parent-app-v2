'use strict';

/**
 * @ngdoc function
 * @name yoAngularifyApp.controller:TotstooCtrl
 * @description
 * # TotstooCtrl
 * Controller of the yoAngularifyApp
 */

define(['app', 'angular'], function (app, angular) {
    app.controller('TotstooCtrl', ["$scope", function ($scope) {
        $scope.title = "Totstoo page"
    }]);
    // ...
    //or use angular.module to create a new module
});

