"use strict";

define([
    "angular",
    "js/controllers/choosepin/choosepin",
    "mock"
], function (angular, choosepin, mock) {

    describe("Controller: ChoosepinCtrl", function () {

        // load the controller"s module
        var ChoosepinCtrl,
            scope;

        // Initialize the controller and a mock scope

        beforeEach(function () {
            angular.mock.module("yo-angularifyApp");
            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                ChoosepinCtrl = $controller("ChoosepinCtrl", {
                    $scope: scope
                });
            });
        });

        it("should attach title to the scope", function () {
            expect(scope.title).toBe("Choosepin page");
        });
    });
});
