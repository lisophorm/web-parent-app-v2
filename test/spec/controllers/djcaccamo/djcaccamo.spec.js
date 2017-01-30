"use strict";

define([
    "angular",
    "js/controllers/djcaccamo/djcaccamo",
    "mock"
], function (angular, djcaccamo, mock) {

    describe("Controller: DjcaccamoCtrl", function () {

        // load the controller"s module
        var DjcaccamoCtrl,
            scope;

        // Initialize the controller and a mock scope

        beforeEach(function () {
            angular.mock.module("yo-angularifyApp");
            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                DjcaccamoCtrl = $controller("DjcaccamoCtrl", {
                    $scope: scope
                });
            });
        });

        it("should attach title to the scope", function () {
            expect(scope.title).toBe("Djcaccamo page");
        });
    });
});
