'use strict';

/**
 * @ngdoc function
 * @name web-parent-app-v2.controller:ResendverificationCtrl
 * @description
 * # ResendverificationCtrl
 * Controller of the web-parent-app-v2
 */

define(['app', 'angular'], function (app, angular) {
    app.controller('ResendVerificationCtrl', ["$scope", function ($scope) {
        console.log('within resend notification controller');
        $scope.title = "Resendverification page"
    }]);
    // ...
    //or use angular.module to create a new module
});

