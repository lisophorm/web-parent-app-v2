"use strict";

define([
    "angular",
    "js/controllers/login/login",
    "mock"
], function (angular, login, mock) {

    describe("Controller: LoginCtrl", function () {

        // load the controller"s module
        var LoginCtrl,
            scope;

        // Initialize the controller and a mock scope

        beforeEach(function () {
            angular.mock.module("yo-angularifyApp");
            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                LoginCtrl = $controller("LoginCtrl", {
                    $scope: scope
                });
            });
        });

        it("should attach title to the scope", function () {
            expect(scope.title).toBe("Login page");
        });
    });
});
