"use strict";

define([
    "angular",
    "js/controllers/editprofile/editprofile",
    "mock"
], function (angular, editprofile, mock) {

    describe("Controller: EditprofileCtrl", function () {

        // load the controller"s module
        var EditprofileCtrl,
            scope;

        // Initialize the controller and a mock scope

        beforeEach(function () {
            angular.mock.module("yo-angularifyApp");
            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                EditprofileCtrl = $controller("EditprofileCtrl", {
                    $scope: scope
                });
            });
        });

        it("should attach title to the scope", function () {
            expect(scope.title).toBe("Editprofile page");
        });
    });
});
