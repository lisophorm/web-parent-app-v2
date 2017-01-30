"use strict";

define([
    "angular",
    "js/controllers/displayprofile/displayprofile",
    "mock"
], function (angular, displayprofile, mock) {

    describe("Controller: DisplayprofileCtrl", function () {

        // load the controller"s module
        var DisplayprofileCtrl,
            scope;

        // Initialize the controller and a mock scope

        beforeEach(function () {
            angular.mock.module("yo-angularifyApp");
            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                DisplayprofileCtrl = $controller("DisplayprofileCtrl", {
                    $scope: scope
                });
            });
        });

        it("should attach title to the scope", function () {
            expect(scope.title).toBe("Displayprofile page");
        });
    });
});
