"use strict";

define([
    "angular",
    "js/controllers/signupend/signupend",
    "mock"
], function (angular, signupend, mock) {

    describe("Controller: SignupendCtrl", function () {

        // load the controller"s module
        var SignupendCtrl,
            scope;

        // Initialize the controller and a mock scope

        beforeEach(function () {
            angular.mock.module("yo-angularifyApp");
            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                SignupendCtrl = $controller("SignupendCtrl", {
                    $scope: scope
                });
            });
        });

        it("should attach title to the scope", function () {
            expect(scope.title).toBe("Signupend page");
        });
    });
});
