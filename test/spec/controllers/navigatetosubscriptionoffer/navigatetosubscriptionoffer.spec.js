"use strict";

define([
    "angular",
    "js/controllers/navigateToSubscriptionOffer/navigateToSubscriptionOffer",
    "mock"
], function (angular, navigateToSubscriptionOffer, mock) {

    describe("Controller: NavigatetosubscriptionofferCtrl", function () {

        // load the controller"s module
        var NavigatetosubscriptionofferCtrl,
            scope;

        // Initialize the controller and a mock scope

        beforeEach(function () {
            angular.mock.module("yo-angularifyApp");
            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                NavigatetosubscriptionofferCtrl = $controller("NavigatetosubscriptionofferCtrl", {
                    $scope: scope
                });
            });
        });

        it("should attach title to the scope", function () {
            expect(scope.title).toBe("Navigatetosubscriptionoffer page");
        });
    });
});
