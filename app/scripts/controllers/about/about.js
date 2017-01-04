'use strict';

/**
 * @ngdoc function
 * @name yoAngularifyApp.controller:aboutCtrl
 * @description
 * # aboutCtrl
 * Controller of the yoAngularifyApp
 */

define(['app', 'angular'], function (app, angular) {

    app.controller('AboutCtrl', ["$scope", "first", function ($scope, first) {
        console.log('within about controller');
        $scope.title = "About page";
        $scope.sayHello = first.getGreet();
        //var factoryTemp=factory01.someMethod();
        //console.log('factory content',factoryTemp);
    }]);

    //also can use angular.module
});

