"use strict";

define([
    "angular",
    "js/controllers/signup/signup",
    "mock"
], function (angular, signup, mock) {

    describe("Controller: SignupCtrl", function () {

        // load the controller"s module
        var SignupCtrl,
            scope;

        // Initialize the controller and a mock scope

        beforeEach(function () {
            angular.mock.module("yo-angularifyApp");
            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                SignupCtrl = $controller("SignupCtrl", {
                    $scope: scope
                });
            });
        });

        it("should attach title to the scope", function () {
            expect(scope.title).toBe("Signup page");
        });
    });
});
