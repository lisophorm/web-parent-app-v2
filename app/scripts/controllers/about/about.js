'use strict';

/**
 * @ngdoc function
 * @name com.tinizine.azoomee.parent.main.controller:aboutCtrl
 * @description
 * # aboutCtrl
 * Test controller for test stuff
 */

define(['app', 'angular', 'config'], function (app, angular, config) {

    app.controller('AboutCtrl', ["$scope", "first", '$cookies', '$http', 'userSession', function ($scope, first, $cookies, $http, userSession) {

        $scope.title = "About page";
        $scope.sayHello = first.getGreet();
        $scope.userID = userSession.getJWTUser();
        $http({
            url: config.userUrl + '/adult/' + $scope.userID,
            method: "GET"
        }).then(function (res) {

            $scope.profileName = res.data.profileName;
        }, function (erro) {

        });
    }]);

});

