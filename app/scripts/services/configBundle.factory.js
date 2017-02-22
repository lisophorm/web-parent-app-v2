'use strict';

/**
 * @ngdoc service
 * @name com.tinizine.azoomee.parent.main.configBundle
 * @description
 * # configBundle
 * Factory in the com.tinizine.azoomee.parent.main.
 */
define(['app', 'angular'], function (app, angular) {

    app.factory('configBundle', function () {
        // Service logic
        // ...


        var meaningOfLife = 42;

        // Public API here
        return {
            someMethod: function () {
                return meaningOfLife;
            }
        };
    });
    // or use angular.module to create a new module
});
