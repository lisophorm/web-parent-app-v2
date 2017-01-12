"use strict";

define([
    "angular",
    "js/controllers/passwordReset/passwordReset",
    "mock"
], function (angular, passwordReset, mock) {

    describe("Controller: PasswordresetCtrl", function () {

        // load the controller"s module
        var PasswordresetCtrl,
            scope;

        // Initialize the controller and a mock scope

        beforeEach(function () {
            angular.mock.module("yo-angularifyApp");
            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                PasswordresetCtrl = $controller("PasswordresetCtrl", {
                    $scope: scope
                });
            });
        });

        it("should attach title to the scope", function () {
            expect(scope.title).toBe("Passwordreset page");
        });
    });
});
