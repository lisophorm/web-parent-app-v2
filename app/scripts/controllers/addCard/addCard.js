/**
 * @ngdoc function
 * @name yoAngularifyApp.controller:AddcardCtrl
 * @description
 * # AddcardCtrl
 * Controller of the yoAngularifyApp
 */
var paymentDetailsChangedListener;


define(['app', 'angular'], function (app, angular) {
    app.controller('AddcardCtrl', ["$scope", function ($scope) {
        $scope.title = "Addcard page";
        console.log("****** ADDCARD controller");
    }]);
    // ...
    //or use angular.module to create a new module
});

