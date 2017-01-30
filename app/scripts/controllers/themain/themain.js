console.log('**************LOADED MAIN CONTROLLER');
/**
 * @ngdoc function
 * @name yoAngularifyApp.controller:ThemainCtrl
 * @description
 * # ThemainCtrl
 * Controller of the yoAngularifyApp
 */

define(['app', 'angular'], function (app, angular) {
    angular.module('com.tinizine.azoomee.parent.main').register.controller('ThemainCtrl', ["$scope", function ($scope) {
        $scope.title = "Themain page"
    }]);

});


