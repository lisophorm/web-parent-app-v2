'use strict';

/**
 * @ngdoc directive
 * @name yoAngularifyApp.directive:tickyTag
 * @description
 * # tickyTag
 */
define(['app', 'angular'], function (app, angular) {
    app.directive('tickyTag', function () {
        console.log('within tickyTa directive ciao ciao');
        return {
            template: '<div></div>',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                element.html('<b>this is the tickyTag directive</b>');
            }
        };
    });
    // or use angular.module to create a new module
});
