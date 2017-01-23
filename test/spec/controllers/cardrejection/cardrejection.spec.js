"use strict";

define([
    "angular",
    "js/controllers/cardrejection/cardrejection",
    "mock"
], function (angular, cardrejection, mock) {

    describe("Controller: CardrejectionCtrl", function () {

        // load the controller"s module
        var CardrejectionCtrl,
            scope;

        // Initialize the controller and a mock scope

        beforeEach(function () {
            angular.mock.module("yo-angularifyApp");
            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                CardrejectionCtrl = $controller("CardrejectionCtrl", {
                    $scope: scope
                });
            });
        });

        it("should attach title to the scope", function () {
            expect(scope.title).toBe("Cardrejection page");
        });
    });
});
