"use strict";

define([
    "angular",
    "js/controllers/login/loginCtrl",
    "mock"
], function (angular, loginCtrl, mock) {

    describe("Controller: LoginctrlCtrl", function () {

        // load the controller"s module
        var LoginctrlCtrl,
            scope;

        // Initialize the controller and a mock scope

        beforeEach(function () {
            angular.mock.module("yo-angularifyApp");
            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                LoginctrlCtrl = $controller("LoginctrlCtrl", {
                    $scope: scope
                });
            });
        });

        it("should attach title to the scope", function () {
            expect(scope.title).toBe("Loginctrl page");
        });
    });
});
