"use strict";

define([
    "angular",
    "js/controllers/home/home",
    "mock"
], function (angular, home, mock) {

    describe("Controller: HomeCtrl", function () {

        // load the controller"s module
        var HomeCtrl,
            scope;

        // Initialize the controller and a mock scope

        beforeEach(function () {
            angular.mock.module("yo-angularifyApp");
            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                HomeCtrl = $controller("HomeCtrl", {
                    $scope: scope
                });
            });
        });

        it("should attach title to the scope", function () {
            expect(scope.title).toBe("Home page");
        });
    });
});
