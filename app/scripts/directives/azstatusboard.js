'use strict';

/**
 * @ngdoc directive
 * @name yoAngularifyApp.directive:azStatusBoard
 * @description
 * # azStatusBoard
 */
define(['app', 'angular'], function (app, angular) {
    app
        .directive('azStatusBoard', ['$timeout', function ($timeout) {
            return {
                templateUrl: 'views/status/status.tmpl.html',
                scope: {    //isolated scope
                    status: '=statusObject',
                    delayError: '=',
                    delaySuccess: '='
                },
                controller: ['$scope', function ($scope) {

                    var controller = {
                        init: function () {


                            $scope.status = {
                                setSuccessMsg: controller.setSuccessMsg,
                                setErrorMsg: controller.setErrorMsg
                            };
                            $scope.getErrorMsg = controller.getErrorMsg;
                            $scope.getSuccessMsg = controller.getSuccessMsg;
                        },
                        setErrorMsg: function (msg) {
                            $scope.successMsg = '';
                            $scope.errorMsg = msg;
                            if ($scope.delayError) {
                                $timeout(function () {
                                    $scope.errorMsg = '';
                                }, $scope.delayError);
                            }
                        },
                        setSuccessMsg: function (msg) {
                            $scope.errorMsg = '';
                            $scope.successMsg = msg;
                            if ($scope.delaySuccess) {
                                $timeout(function () {
                                    $scope.successMsg = '';
                                }, $scope.delaySuccess);
                            }
                        }
                    };
                    controller.init();
                }]
            }
        }]);
    // or use angular.module to create a new module
});
