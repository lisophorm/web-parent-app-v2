'use strict';

/**
 * @ngdoc function
 * @name com.tinizine.azoomee.parent.main.controller:aboutCtrl
 * @description
 * # aboutCtrl
 * Controller of the com.tinizine.azoomee.parent.main
 */

define(['app', 'angular'], function (app, angular) {

    app.controller('AboutCtrl', ["$scope", "first", '$cookies', function ($scope, first, $cookies) {
        console.log('within about controller');
        $scope.title = "About page";
        $scope.sayHello = first.getGreet();
        //var factoryTemp=factory01.someMethod();
        //console.log('factory content',factoryTemp);
    }]);

    //also can use angular.module
});

