'use strict';

/**
 * @ngdoc function
 * @name web-parent-app-v2.controller:TotstooCtrl
 * @description
 * # TotstooCtrl
 * Controller of the web-parent-app-v2
 */

define(['app', 'angular'], function (app, angular) {
    app.controller('TotstooCtrl', ["$scope", function ($scope) {
        $scope.title = "Totstoo page"
    }]);
    // ...
    //or use angular.module to create a new module
});

