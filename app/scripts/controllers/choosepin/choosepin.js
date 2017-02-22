'use strict';

/**
 * @ngdoc function
 * @name yoAngularifyApp.controller:ChoosepinCtrl
 * @description
 * # ChoosepinCtrl
 * Controller of the yoAngularifyApp
 */

define(['app', 'angular', 'azStatusBoard'], function (app, angular) {
    app.controller('ChoosepinCtrl', ['$scope', 'userApi', 'choosePinStrings', '$location', '$timeout', '$document', '$stateParams',
        function ($scope, userApi, choosePinStrings, $location, $timeout, $document, $stateParams) {
            //

            console.log("choose pin controller");
            // controller init
            //
            var profile;

            $scope.signupJourney = ($location.path().indexOf('signup') !== -1);
            $scope.strings = choosePinStrings;
            $scope.strings.pinPlaceholder = "____";

            $scope.pin = "";
            $scope.confirmedPin = "";
            $scope.$watch("pin", pinValueChanged);
            $scope.$watch("confirmedPin", confirmedPinValueChanged);

            $scope.enabled = false;
            $scope.updatePin = updatePin;
            userApi.getAdultProfile()
                .then(function (prf) {
                    console.log("*** ADULT PROFILE RETRIEVED");
                    profile = prf;
                    if (profile.pinNumber != null) {
                        navigateToChildrenCreation();
                        return;
                    }
                    $scope.enabled = true;
                    $timeout(function () {
                        scrollToElement('pinEntry');
                    }, 0);
                }, function (err) {
                    console.log("Error while retrieving PIN", err);
                });
// controller funcs
            //
            function scrollToElement(id) {
                var element = angular.element(document.getElementById(id));
                $document.scrollToElementAnimated(element, 80, 1000);
            }

            function pinValueChanged(oldValue, newValue) {
                if ($scope.pin && $scope.pin.length === 4) {
                    scrollToElement("pinVerifyEntry");
                }
            }

            function confirmedPinValueChanged(oldValue, newValue) {
                if ($scope.confirmedPin && $scope.confirmedPin.length === 4 && $scope.pin && $scope.pin.length === 4) {
                    scrollToElement("pinSubmit");
                }
            }

            function updatePin() {
                if ($scope.pin.length < 4) {
                    $scope.status.setErrorMsg("The two PINs should have 4 digits");
                    scrollToElement("statusBoard");
                    return;
                }
                if ($scope.pin !== $scope.confirmedPin) {
                    $scope.status.setErrorMsg("The two PIN codes are different");
                    scrollToElement("statusBoard");
                    return;
                }
                profile.pinNumber = $scope.pin;
                userApi.updateAdultProfile(profile)
                    .then(function () {
                        navigateToChildrenCreation();
                    }, function (err) {
                        console.log("Error while updating adult profile to set up PIN for the first time", err);
                    });
            }

            function navigateToChildrenCreation() {
                console.log("******** navigate to child creation");
                if ($scope.signupJourney) {
                    $location.path('/signup/newChildProfile');
                } else {
                    $location.path('/profile/child/' + $stateParams.profileId + '/edit');
                }
            }

            //

        }]);
    // ...

});

