'use strict';

/**
 * @ngdoc service
 * @name yoAngularifyApp.servo01
 * @description
 * # servo01
 * Service in the yoAngularifyApp.
 */
define(['app', 'angular'], function (app, angular) {
    app.service('servo01', function servo01() {
        this.greet = "Hello From Servo01 service";
        this.getGreet = function () {
            return this.greet;
        }
    });
});
