"use strict";

define([
    "angular",
    "js/controllers/addCard/addCard",
    "mock"
], function (angular, addCard, mock) {

    describe("Controller: AddcardCtrl", function () {

        // load the controller"s module
        var AddcardCtrl,
            scope;

        // Initialize the controller and a mock scope

        beforeEach(function () {
            angular.mock.module("yo-angularifyApp");
            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                AddcardCtrl = $controller("AddcardCtrl", {
                    $scope: scope
                });
            });
        });

        it("should attach title to the scope", function () {
            expect(scope.title).toBe("Addcard page");
        });
    });
});
