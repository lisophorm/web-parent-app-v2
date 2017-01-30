"use strict";

define([
    "angular",
    "js/controllers/ModalController/ModalController",
    "mock"
], function (angular, ModalController, mock) {

    describe("Controller: ModalcontrollerCtrl", function () {

        // load the controller"s module
        var ModalcontrollerCtrl,
            scope;

        // Initialize the controller and a mock scope

        beforeEach(function () {
            angular.mock.module("yo-angularifyApp");
            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                ModalcontrollerCtrl = $controller("ModalcontrollerCtrl", {
                    $scope: scope
                });
            });
        });

        it("should attach title to the scope", function () {
            expect(scope.title).toBe("Modalcontroller page");
        });
    });
});
