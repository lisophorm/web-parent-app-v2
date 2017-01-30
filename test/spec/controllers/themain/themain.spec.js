"use strict";

define([
    "angular",
    "js/controllers/theMain/theMain",
    "mock"
], function (angular, theMain, mock) {

    describe("Controller: ThemainCtrl", function () {

        // load the controller"s module
        var ThemainCtrl,
            scope;

        // Initialize the controller and a mock scope

        beforeEach(function () {
            angular.mock.module("yo-angularifyApp");
            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                ThemainCtrl = $controller("ThemainCtrl", {
                    $scope: scope
                });
            });
        });

        it("should attach title to the scope", function () {
            expect(scope.title).toBe("Themain page");
        });
    });
});
