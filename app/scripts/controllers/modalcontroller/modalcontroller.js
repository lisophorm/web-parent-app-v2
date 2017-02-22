

/**
 * @ngdoc function
 * @name yoAngularifyApp.controller:ModalcontrollerCtrl
 * @description
 * # ModalcontrollerCtrl
 * Controller of the yoAngularifyApp
 */

define(['app', 'angular'], function (app, angular) {
    app.controller('ModalcontrollerCtrl', ["$scope", "close", function ($scope, close) {



        // when you need to close the modal, call close
        //close("Success!");
        $scope.close = function (parameter) {

            close(parameter);
        }

    }]);
    // ...

});

