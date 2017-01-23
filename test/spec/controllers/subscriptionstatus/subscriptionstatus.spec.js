"use strict";

define([
    "angular",
    "js/controllers/subscriptionstatus/subscriptionstatus",
    "mock"
], function (angular, subscriptionstatus, mock) {

    describe("Controller: SubscriptionstatusCtrl", function () {

        // load the controller"s module
        var SubscriptionstatusCtrl,
            scope;

        // Initialize the controller and a mock scope

        beforeEach(function () {
            angular.mock.module("yo-angularifyApp");
            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                SubscriptionstatusCtrl = $controller("SubscriptionstatusCtrl", {
                    $scope: scope
                });
            });
        });

        it("should attach title to the scope", function () {
            expect(scope.title).toBe("Subscriptionstatus page");
        });
    });
});
