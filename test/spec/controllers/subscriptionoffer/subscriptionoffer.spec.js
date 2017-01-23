"use strict";

define([
    "angular",
    "js/controllers/subscriptionOffer/subscriptionOffer",
    "mock"
], function (angular, subscriptionOffer, mock) {

    describe("Controller: SubscriptionofferCtrl", function () {

        // load the controller"s module
        var SubscriptionofferCtrl,
            scope;

        // Initialize the controller and a mock scope

        beforeEach(function () {
            angular.mock.module("yo-angularifyApp");
            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                SubscriptionofferCtrl = $controller("SubscriptionofferCtrl", {
                    $scope: scope
                });
            });
        });

        it("should attach title to the scope", function () {
            expect(scope.title).toBe("Subscriptionoffer page");
        });
    });
});
