"use strict";

define([
    "angular",
    "js/controllers/theMainController/theMainController",
    "mock"
], function (angular, theMainController, mock) {

    describe("Controller: ThemaincontrollerCtrl", function () {

        // load the controller"s module
        var ThemaincontrollerCtrl,
            scope;

        // Initialize the controller and a mock scope

        beforeEach(function () {
            angular.mock.module("yo-angularifyApp");
            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                ThemaincontrollerCtrl = $controller("ThemaincontrollerCtrl", {
                    $scope: scope
                });
            });
        });

        it("should attach title to the scope", function () {
            expect(scope.title).toBe("Themaincontroller page");
        });
    });
});
