'use strict';

/**
 * @ngdoc function
 * @name yoAngularifyApp.controller:ForgottenCtrl
 * @description
 * # ForgottenCtrl
 * Controller of the yoAngularifyApp
 */

define(['app', 'angular'], function (app, angular) {
    app.controller('ForgottenCtrl', ["$scope", function ($scope) {
        $scope.title = "Forgotten page"
    }]);
    // ...
    //or use angular.module to create a new module
});

