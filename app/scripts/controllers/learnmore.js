'use strict';

/**
 * @ngdoc function
 * @name yoAngularifyApp.controller:LearnmoreCtrl
 * @description
 * # LearnmoreCtrl
 * Controller of the yoAngularifyApp
 */

define(['app', 'angular', 'jquery', 'slick-carousel'],
    function (app, angular) {
        app.controller('LearnmoreCtrl', ['$scope', '$timeout', 'learnMoreStrings',
            function ($scope, $timeout, learnMoreStrings) {
                $scope.strings = learnMoreStrings;
                $timeout(function () {
                    var slickOptions = {
                        autoplay: true,
                        autoplaySpeed: 5000,
                        dots: true,
                        pauseOnDotsHover: true,
                        cssEase: 'cubic-bezier(.17,.67,.59,.51)'
                    };
                    jQuery('.carousel').slick(slickOptions);
                }, 0);
            }]);
        // ...
        //or use angular.module to create a new module
    });

