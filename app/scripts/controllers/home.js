'use strict';

/**
 * @ngdoc function
 * @name com.tinizine.azoomee.parent.main.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the com.tinizine.azoomee.parent.main
 */

define(['app', 'angular', 'config', 'ModalcontrollerCtrl'], function (app, angular, config) {
    app.controller('HomeCtrl', ["$scope", 'userSession', '$http', 'forgottenPasswordStrings', 'ModalService', function ($scope, userSession, $http, forgottenPasswordStrings, ModalService) {
        $scope.title = "Home page";
        $scope.userID = userSession.getJWTUser();
        $scope.profileName = "";
        console.log("test strings", forgottenPasswordStrings);
        //$scope.userID=userSession.getJWTUser();

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
        $scope.showModal = function () {
            console.log('show modal');
            ModalService.showModal({
                templateUrl: "/views/modals/template.html",
                controller: "ModalcontrollerCtrl",
                scope: $scope
            }).then(function (modal) {
                console.log("modal then", modal);
                //it's a bootstrap element, use 'modal' to show it
                //modal.element.modal();
                modal.close.then(function (result) {

                    console.log('result passed by modal');
                    console.log(result);
                });
            });
        }
    }]);
    // ...
    //or use angular.module to create a new module
});

