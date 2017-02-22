console.log("*** LOADED ModalController");

/**
 * @ngdoc function
 * @name yoAngularifyApp.controller:ModalcontrollerCtrl
 * @description
 * # ModalcontrollerCtrl
 * Controller of the yoAngularifyApp
 */

define(['app', 'angular'], function (app, angular) {
    app.controller('ModalcontrollerCtrl', ["$scope", "close", function ($scope, close) {
        console.log("*** WITHIN ModalController");
        console.log("calling close");
        console.log("dummy", $scope.dummy);
        // when you need to close the modal, call close
        //close("Success!");
        $scope.close = function (parameter) {
            console.log("CLOSE THE MODAL", parameter);
            close(parameter);
        }

    }]);
    // ...

});

