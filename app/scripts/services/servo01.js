'use strict';

/**
 * @ngdoc service
 * @name com.tinizine.azoomee.parent.main.servo01
 * @description
 * # servo01
 * Service in the com.tinizine.azoomee.parent.main.
 */
define(['app', 'angular'], function (app, angular) {
    app.service('servo01', ["$rootScope", function servo01($rootScope) {
        console.log('INSIDE SERVO01');
        this.greet = "Hello From Servo01 service";
        console.log($rootScope.gino);
        this.getGreet = function () {
            return this.greet;
        }
    }]);
});
