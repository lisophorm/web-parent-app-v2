'use strict';

/**
 * @ngdoc function
 * @name yoAngularifyApp.controller:VerificationCtrl
 * @description
 * # VerificationCtrl
 * Controller of the yoAngularifyApp
 */

define(['app', 'angular'], function (app, angular) {
    app.controller('VerificationCtrl', ["$scope", function ($scope) {
        $scope.title = "Verification page"
    }]);
    // ...
    //or use angular.module to create a new module
});

