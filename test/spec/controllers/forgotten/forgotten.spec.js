"use strict";

define([
    "angular",
    "js/controllers/forgotten/forgotten",
    "mock"
], function (angular, forgotten, mock) {

    describe("Controller: ForgottenCtrl", function () {

        // load the controller"s module
        var ForgottenCtrl,
            scope;

        // Initialize the controller and a mock scope

        beforeEach(function () {
            angular.mock.module("yo-angularifyApp");
            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                ForgottenCtrl = $controller("ForgottenCtrl", {
                    $scope: scope
                });
            });
        });

        it("should attach title to the scope", function () {
            expect(scope.title).toBe("Forgotten page");
        });
    });
});
