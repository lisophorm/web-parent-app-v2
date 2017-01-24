'use strict';

/**
 * @ngdoc function
 * @name yoAngularifyApp.controller:EditadultprofileCtrl
 * @description
 * # EditadultprofileCtrl
 * Controller of the yoAngularifyApp
 */

define(['app', 'angular', 'underscore', 'azStatusBoard'], function (app, angular, _) {
    app.controller('EditadultprofileCtrl', ['$scope', 'editAdultProfileStrings', '$stateParams', 'userApi', '$window', '$location', 'analytics', function ($scope, editAdultProfileStrings, $stateParams, userApi, $window, $location, analytics) {
        $scope.title = "Editadultprofile page";
        $scope.strings = editAdultProfileStrings;

    }]);
    // ...
    //or use angular.module to create a new module
});

