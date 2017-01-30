"use strict";

define([
    "angular",
    "js/controllers/voucherredeem/voucherredeem",
    "mock"
], function (angular, voucherredeem, mock) {

    describe("Controller: VoucherredeemCtrl", function () {

        // load the controller"s module
        var VoucherredeemCtrl,
            scope;

        // Initialize the controller and a mock scope

        beforeEach(function () {
            angular.mock.module("yo-angularifyApp");
            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                VoucherredeemCtrl = $controller("VoucherredeemCtrl", {
                    $scope: scope
                });
            });
        });

        it("should attach title to the scope", function () {
            expect(scope.title).toBe("Voucherredeem page");
        });
    });
});
