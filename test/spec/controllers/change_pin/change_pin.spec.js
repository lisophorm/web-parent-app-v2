"use strict";

define([
    "angular",
    "js/controllers/change_pin/change_pin",
    "mock"
], function (angular, changePin, mock) {

    describe("Controller: ChangePinCtrl", function () {

        // load the controller"s module
        var ChangePinCtrl,
            scope;

        // Initialize the controller and a mock scope

        beforeEach(function () {
            angular.mock.module("yo-angularifyApp");
            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                ChangePinCtrl = $controller("ChangePinCtrl", {
                    $scope: scope
                });
            });
        });

        it("should attach title to the scope", function () {
            expect(scope.title).toBe("ChangePin page");
        });
    });
});
