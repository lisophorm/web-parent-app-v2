"use strict";

define([
    "angular",
    "js/directives/azStatusBoard",
    "mock"
], function (angular, azStatusBoard, mock) {

    describe("Directive: azStatusBoard", function () {

        // load the directive"s module
        var element,
            scope;

        beforeEach(function () {
            angular.mock.module("yo-angularifyApp");
            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
            });
        });

        it("should make hidden element visible", angular.mock.inject(function ($compile) {
            element = angular.element("<az-status-board></az-status-board>");
            element = $compile(element)(scope);
            expect(element.text()).toBe("this is the azStatusBoard directive");
        }));
    });
});
