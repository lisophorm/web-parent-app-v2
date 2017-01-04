"use strict";

define([
    "angular",
    "js/directives/tickyTag",
    "mock"
], function (angular, tickyTag, mock) {

    describe("Directive: tickyTag", function () {

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
            element = angular.element("<ticky-tag></ticky-tag>");
            element = $compile(element)(scope);
            expect(element.text()).toBe("this is the tickyTag directive");
        }));
    });
});
