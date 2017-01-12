"use strict";

define([
    "angular",
    "js/controllers/verification/verification",
    "mock"
], function (angular, verification, mock) {

    describe("Controller: VerificationCtrl", function () {

        // load the controller"s module
        var VerificationCtrl,
            scope;

        // Initialize the controller and a mock scope

        beforeEach(function () {
            angular.mock.module("yo-angularifyApp");
            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                VerificationCtrl = $controller("VerificationCtrl", {
                    $scope: scope
                });
            });
        });

        it("should attach title to the scope", function () {
            expect(scope.title).toBe("Verification page");
        });
    });
});
