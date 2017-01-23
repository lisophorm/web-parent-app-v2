"use strict";

define([
    "angular",
    "js/controllers/signupsubscriptionoffer/signupsubscriptionoffer",
    "mock"
], function (angular, signupsubscriptionoffer, mock) {

    describe("Controller: SignupsubscriptionofferCtrl", function () {

        // load the controller"s module
        var SignupsubscriptionofferCtrl,
            scope;

        // Initialize the controller and a mock scope

        beforeEach(function () {
            angular.mock.module("yo-angularifyApp");
            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                SignupsubscriptionofferCtrl = $controller("SignupsubscriptionofferCtrl", {
                    $scope: scope
                });
            });
        });

        it("should attach title to the scope", function () {
            expect(scope.title).toBe("Signupsubscriptionoffer page");
        });
    });
});
