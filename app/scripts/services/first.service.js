'use strict';

/**
 * @ngdoc service
 * @name yoAngularifyApp.first
 * @description
 * # first
 * Service in the yoAngularifyApp.
 */
define(['app', 'angular'], function (app, angular) {
    app.service('first', function first() {
        this.greet = "Hello From Greet Module";
        this.getGreet = function () {
            return this.greet;
        }
    });
});
