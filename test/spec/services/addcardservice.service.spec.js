"use strict";

define([
    "angular",
    "js/services/addCardService.service",
    "mock"
], function (angular, addCardService, mock) {

    describe("Service: addCardService", function () {
        // instantiate service
        var addCardService;

        beforeEach(function () {
            // load the service"s module
            angular.mock.module("yo-angularifyApp");
            angular.mock.inject(function (_addCardService_) {
                addCardService = _addCardService_;
            });
        });

        it("should do something", function () {
            expect(!!addCardService).toBe(true);
        });

    });
});
