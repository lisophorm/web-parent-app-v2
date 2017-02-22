'use strict';

/**
 * @ngdoc function
 * @name yoAngularifyApp.controller:DisplayprofileCtrl
 * @description
 * # DisplayprofileCtrl
 * Controller of the yoAngularifyApp
 */

define(['app', 'angular', 'moment'], function (app, angular, moment) {
    app.controller('DisplayprofileCtrl', ['$scope', '$stateParams', 'userApi', 'displayProfileStrings', '$location', 'analytics', 'userSession',
        function ($scope, $stateParams, userApi, displayProfileStrings, $location, analytics, userSession) {

            var retrieveProfile;
            $scope.strings = displayProfileStrings;

            $scope.computeAgeInYears = computeAgeInYears;
            $scope.navigateToStats = navigateToStats;
            $scope.navigateToChangePassword = navigateToChangePassword;
            $scope.navigateToChangePin = navigateToChangePin;
            $scope.editProfile = editProfile;
            $scope.displayingAdultProfile = displayingAdultProfile;
            userApi.getChildProfiles(userSession.getJWTUser()).then(function (res) {
                console.log('CHILD PROFILES:', res)
            }, function (err) {
                console.log('ERRORCHILD PROFILES:', err)

            })
            if (displayingAdultProfile()) {
                retrieveProfile = userApi.getAdultProfile;

            } else {
                retrieveProfile = userApi.getChildProfile;


            }



            retrieveProfile($stateParams.profileId)
                .then(function (profile) {
                    $scope.profile = profile;
                }, function (error) {

                    //alert(error);
                });

            if (displayingAdultProfile()) {
                analytics.newPage("displayAdultProfile");
            } else {
                analytics.newPage("displayChildProfile", {profileId: $stateParams.profileId});
            }
            //
            //
            //
            function computeAgeInYears() {
                if ($scope.profile) {
                    var dob = moment($scope.profile.dob),
                        dobYear = dob.year();
                    if (moment().year(dob.year()).diff(dob) > 0) { //born on a date later or equal than today
                        return moment().year() - dobYear;
                    }
                    return moment().year() - dobYear - 1;
                } else {
                    return "";
                }
            }

            function editProfile() {
                $location.url('profile/' + $stateParams.profileType + '/' + $stateParams.profileId + "/edit");
            }

            function navigateToStats() {
                $location.url('profile/child/' + $stateParams.profileId + "/stats");
            }

            function navigateToChangePassword() {
                $location.url('change_password');
            }

            function navigateToChangePin() {
                $location.url('change_pin');
            }

            function displayingAdultProfile() {
                return $stateParams.profileType === 'adult';
            }
        }]);
    // ...

});

