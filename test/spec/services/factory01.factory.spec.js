"use strict";

define([
    "angular",
    "js/services/factory01.factory",
    "mock"
], function (angular, factory01, mock) {

    describe("Service: factory01", function () {
        // instantiate service
        var factory01;

        beforeEach(function () {
            // load the service"s module
            angular.mock.module("yo-angularifyApp");
            angular.mock.inject(function (_factory01_) {
                factory01 = _factory01_;
            });
        });

        it("should do something", function () {
            expect(!!factory01).toBe(true);
        });

    });
});
