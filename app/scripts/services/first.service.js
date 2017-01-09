'use strict';

/**
 * @ngdoc service
 * @name com.tinizine.azoomee.parent.main.first
 * @description
 * # first
 * Service in the com.tinizine.azoomee.parent.main.
 */
define(['app', 'angular'], function (app, angular) {
    app.service('first', function first() {
        this.greet = "Hello From Greet Module";
        this.getGreet = function () {
            return this.greet;
        }
    });
});
