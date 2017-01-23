"use strict";

define([
    "angular",
    "js/controllers/totstoo/totstoo",
    "mock"
], function (angular, totstoo, mock) {

    describe("Controller: TotstooCtrl", function () {

        // load the controller"s module
        var TotstooCtrl,
            scope;

        // Initialize the controller and a mock scope

        beforeEach(function () {
            angular.mock.module("yo-angularifyApp");
            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                TotstooCtrl = $controller("TotstooCtrl", {
                    $scope: scope
                });
            });
        });

        it("should attach title to the scope", function () {
            expect(scope.title).toBe("Totstoo page");
        });
    });
});
