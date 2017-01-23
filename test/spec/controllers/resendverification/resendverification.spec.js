"use strict";

define([
    "angular",
    "js/controllers/resendVerification/resendVerification",
    "mock"
], function (angular, resendVerification, mock) {

    describe("Controller: ResendverificationCtrl", function () {

        // load the controller"s module
        var ResendverificationCtrl,
            scope;

        // Initialize the controller and a mock scope

        beforeEach(function () {
            angular.mock.module("yo-angularifyApp");
            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                ResendverificationCtrl = $controller("ResendverificationCtrl", {
                    $scope: scope
                });
            });
        });

        it("should attach title to the scope", function () {
            expect(scope.title).toBe("Resendverification page");
        });
    });
});
