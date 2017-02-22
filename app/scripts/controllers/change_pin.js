'use strict';

/**
 * @ngdoc function
 * @name yoAngularifyApp.controller:ChangePinCtrl
 * @description
 * # ChangePinCtrl
 * Controller of the yoAngularifyApp
 */

define(['app', 'angular', 'underscore', 'azStatusBoard'], function (app, angular, _) {
    app.controller('ChangePinCtrl', ['$scope', 'pinFormStrings', 'userApi', '$timeout', '$location', 'analytics',
        function ($scope, pinFormStrings, userApi, $timeout, $location, analytics) {
            $scope.strings = pinFormStrings;
            $scope.editing = false;
            $scope.editProfile = editProfile;
            $scope.cancelEditing = cancelEditing;
            $scope.updateParentProfile = updateParentProfile;
            userApi.getAdultProfile()
                .then(function (profile) {
                    $scope.profile = profile;
                });
            analytics.newPage("pinChange");

            function updateParentProfile() {
                userApi.updateAdultProfile($scope.profile)
                    .then(function () {
                        $scope.status.setSuccessMsg(pinFormStrings.updateSuccess);
                        $scope.editing = false;
                        $timeout(navigateToParentProfile, 2000);
                    }, function (err) {
                        $scope.status.setErrorMsg(pinFormStrings.updateError);
                    })
            }
            function editProfile() {
                $scope.originalProfile = $scope.profile;
                $scope.profile = _.clone($scope.originalProfile);
                $scope.editing = true;
            }

            function cancelEditing() {
                $scope.profile = $scope.originalProfile;
                $scope.editing = false;
            }

            function navigateToParentProfile() {
                $location.url('/profile/adult/' + $scope.profile.id);
            }
        }]);
    // ...

});

