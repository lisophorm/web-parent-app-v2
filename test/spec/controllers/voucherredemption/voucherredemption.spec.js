"use strict";

define([
    "angular",
    "js/controllers/voucherRedemption/voucherRedemption",
    "mock"
], function (angular, voucherRedemption, mock) {

    describe("Controller: VoucherredemptionCtrl", function () {

        // load the controller"s module
        var VoucherredemptionCtrl,
            scope;

        // Initialize the controller and a mock scope

        beforeEach(function () {
            angular.mock.module("yo-angularifyApp");
            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                VoucherredemptionCtrl = $controller("VoucherredemptionCtrl", {
                    $scope: scope
                });
            });
        });

        it("should attach title to the scope", function () {
            expect(scope.title).toBe("Voucherredemption page");
        });
    });
});
