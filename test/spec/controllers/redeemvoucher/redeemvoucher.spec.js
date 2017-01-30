"use strict";

define([
    "angular",
    "js/controllers/redeemvoucher/redeemvoucher",
    "mock"
], function (angular, redeemvoucher, mock) {

    describe("Controller: RedeemvoucherCtrl", function () {

        // load the controller"s module
        var RedeemvoucherCtrl,
            scope;

        // Initialize the controller and a mock scope

        beforeEach(function () {
            angular.mock.module("yo-angularifyApp");
            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                RedeemvoucherCtrl = $controller("RedeemvoucherCtrl", {
                    $scope: scope
                });
            });
        });

        it("should attach title to the scope", function () {
            expect(scope.title).toBe("Redeemvoucher page");
        });
    });
});
