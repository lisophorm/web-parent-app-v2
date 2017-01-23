"use strict";

define([
    "angular",
    "js/controllers/end/signup/end",
    "mock"
], function (angular, end, mock) {

    describe("Controller: EndCtrl", function () {

        // load the controller"s module
        var EndCtrl,
            scope;

        // Initialize the controller and a mock scope

        beforeEach(function () {
            angular.mock.module("yo-angularifyApp");
            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                EndCtrl = $controller("EndCtrl", {
                    $scope: scope
                });
            });
        });

        it("should attach title to the scope", function () {
            expect(scope.title).toBe("End page");
        });
    });
});
