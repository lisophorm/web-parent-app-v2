'use strict';

/**
 * @ngdoc function
 * @name web-parent-app-v2.controller:ResendverificationCtrl
 * @description
 * # ResendverificationCtrl
 * Controller of the web-parent-app-v2
 */

define(['app', 'angular', 'config'], function (app, angular, config) {
    app.controller('ResendVerificationCtrl', ['$scope', '$http', 'resendStrings', '$rootScope', 'analytics', 'userApi',
        function ($scope, $http, resendStrings, $rootScope, analytics, userApi) {
        console.log('within resend notification controller');
        console.log("resend verification page");
            var resendEndpoint = config.userUrl + "/requestVerificationEmail";

            $scope.strings = resendStrings;
            $scope.submit = submit;
            $scope.inApp = $rootScope.inApp;
            $scope.showForm = true;
            analytics.newPage("resendVerification");
            userApi.getAdultProfile().then(function (retrievedProfile) {
                if (retrievedProfile) {
                    $scope.userId = retrievedProfile.emailAddress;
                }
            });
            //
            // funcs
            //
            function submit() {
                return $http({
                    url: resendEndpoint,
                    method: "POST",
                    data: {
                        emailAddress: $scope.userId
                    }
                }).then(function () {
                        $scope.showForm = false;
                    },
                    function (error) {
                        console.log(error);
                        $scope.errorMsg = resendStrings.error;
                    }
                );
            }
    }]);
    // ...
    //or use angular.module to create a new module
});

