"use strict";

define([
    "angular",
    "js/controllers/editadultprofile/editadultprofile",
    "mock"
], function (angular, editadultprofile, mock) {

    describe("Controller: EditadultprofileCtrl", function () {

        // load the controller"s module
        var EditadultprofileCtrl,
            scope;

        // Initialize the controller and a mock scope

        beforeEach(function () {
            angular.mock.module("yo-angularifyApp");
            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                EditadultprofileCtrl = $controller("EditadultprofileCtrl", {
                    $scope: scope
                });
            });
        });

        it("should attach title to the scope", function () {
            expect(scope.title).toBe("Editadultprofile page");
        });
    });
});
