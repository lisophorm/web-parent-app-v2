'use strict';

/**
 * @ngdoc function
 * @name yoAngularifyApp.controller:CardrejectionCtrl
 * @description
 * # CardrejectionCtrl
 * Controller of the yoAngularifyApp
 */

define(['app', 'angular'], function (app, angular) {
    app.controller('CardrejectionCtrl', ["$scope", 'cardRejectionStrings', '$location', function ($scope, cardRejectionStrings, $location) {
        $scope.title = "Cardrejection page";
        $scope.strings = cardRejectionStrings;
        $scope.tryAgain = navigateToSubscriptionStatus;
        function navigateToSubscriptionStatus() {
            $location.path("/subscriptionstatus");
        }
    }]);
    // ...
    //or use angular.module to create a new module
});

