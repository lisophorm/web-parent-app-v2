"use strict";

define([
    "angular",
    "js/controllers/learnmore/learnmore",
    "mock"
], function (angular, learnmore, mock) {

    describe("Controller: LearnmoreCtrl", function () {

        // load the controller"s module
        var LearnmoreCtrl,
            scope;

        // Initialize the controller and a mock scope

        beforeEach(function () {
            angular.mock.module("yo-angularifyApp");
            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                LearnmoreCtrl = $controller("LearnmoreCtrl", {
                    $scope: scope
                });
            });
        });

        it("should attach title to the scope", function () {
            expect(scope.title).toBe("Learnmore page");
        });
    });
});
