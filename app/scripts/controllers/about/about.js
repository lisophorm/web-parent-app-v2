'use strict';

/**
 * @ngdoc function
 * @name com.tinizine.azoomee.parent.main.controller:aboutCtrl
 * @description
 * # aboutCtrl
 * Controller of the com.tinizine.azoomee.parent.main
 */

define(['app', 'angular', 'config'], function (app, angular, config) {

    app.controller('AboutCtrl', ["$scope", "first", '$cookies', '$http', 'userSession', function ($scope, first, $cookies, $http, userSession) {
        console.log('within about controller');
        $scope.title = "About page";
        $scope.sayHello = first.getGreet();
        $scope.userID = userSession.getJWTUser();
        //var factoryTemp=factory01.someMethod();
        //console.log('factory content',factoryTemp);
        $http({
            url: config.userUrl + '/adult/' + $scope.userID,
            method: "GET"
        }).then(function (res) {
            console.log('user success', res.data);
            $scope.profileName = res.data.profileName;
        }, function (erro) {
            console.log('USER ERROR', erro);
        });
    }]);

    //also can use angular.module
});

