'use strict';

/**
 * @ngdoc function
 * @name com.tinizine.azoomee.parent.main.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the com.tinizine.azoomee.parent.main
 */

define(['app', 'angular', 'config'], function (app, angular, config) {
    app.controller('HomeCtrl', ["$scope", "servo01", "factory01", 'userSession', '$http', function ($scope, servo01, factory01, userSession, $http) {
        $scope.title = "Home page";
        $scope.dummy = servo01.getGreet();
        $scope.userID = userSession.getJWTUser();
        $scope.profileName = "";
        //$scope.userID=userSession.getJWTUser();
        var tempVar = factory01.someMethod();
        console.log('factory value', tempVar);
        console.log(userSession.getJWTUser());
        console.log('user url:', config.userUrl);
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
    // ...
    //or use angular.module to create a new module
});

