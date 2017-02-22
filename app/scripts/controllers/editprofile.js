'use strict';

/**
 * @ngdoc function
 * @name yoAngularifyApp.controller:EditprofileCtrl
 * @description
 * # EditprofileCtrl
 * Controller of the yoAngularifyApp
 */

define(['app', 'angular', 'config', 'underscore', 'jquery', 'azStatusBoard', "ModalcontrollerCtrl"], function (app, angular, config, _, jQuery) {
    app.controller('EditprofileCtrl', ["$scope", "ModalService", 'editProfileStrings', '$stateParams', '$location', 'userApi', 'analytics', '$rootScope', '$state', function ($scope, ModalService, editProfileStrings, $stateParams, $location, userApi, analytics, $rootScope, $state) {

        $scope.strings = editProfileStrings;
        console.log("$stateParams of editprofile", $stateParams);

        $scope.signupJourney = ($location.path().indexOf('signup') !== -1);
        checkPinIsSet();
        $scope.strings.years = [];
        var thisYear = (new Date()).getFullYear(),
            x;
        for (x = 0; x < 21; x++) {
            $scope.strings.years.push(thisYear - x)
        }

        $scope.showAvatarOptions = showAvatarOptions;
        attachAvailableAvatarsToScope();
        $scope.saveProfile = saveProfile;
        $scope.cancelEditing = cancelEditing;
        $scope.showRemoveChildConfirmation = showRemoveChildConfirmation;

        if (creating()) {
            attachProfileToScope(createEmptyProfile());
        } else {
            userApi.getChildProfile($stateParams.profileId)
                .then(attachProfileToScope);
        }
        analytics.newPage("editChildProfile");

        //
        // end of init
        //

        function createEmptyProfile() {
            return {
                profileName: "Child's Name",
                dob: "2010-08-12",
                sex: 'FEMALE',
                avatar: "https://media.azoomee.com/static/thumbs/oomee_00.png",
                password: ""
            }
        }


        function attachProfileToScope(profile) {
            $scope.profile = _.clone(profile);
        }

        function showRemoveChildConfirmation() {
            if (confirm(editProfileStrings.deleteChildConfirm)) {
                removeCurrentChild();
            }
        }

        function removeCurrentChild() {
            console.log('removeCurrentChild');
            var childId = $stateParams.profileId;
            return userApi.getChildProfile(childId).then(function (childProfile) {
                userApi.deleteChildProfile(childProfile).then(function () {
                    console.log('refreshChildProfiles');

                    $rootScope.refreshChildProfiles();
                    console.log('$location.path(config.defaultHomePage)');
                    $state.go(config.defaultState);

                });
            });
        }

        function cancelEditing() {
            $window.history.back();
        }

        function checkPinIsSet() {
            getPin(function (pinNumber) {
                if (!pinNumber) {
                    $location.url('/profile/child/' + $stateParams.profileId + '/choosePinFirst');
                }
            })
        }

        function getPin(callback) {
            userApi.getAdultProfile().then(function (profile) {
                callback(profile.pinNumber);
            }, function () {
                callback(userSession.getParentPinNumberOnLogin());
            });
        }

        function showAvatarOptions() {
            console.log('show modal');
            ModalService.showModal({
                templateUrl: "/views/gallery/gallery.modal.html",
                controller: "ModalcontrollerCtrl",
                scope: $scope
            }).then(function (modal) {
                console.log("modal then", modal);
                //it's a bootstrap element, use 'modal' to show it
                //modal.element.modal();
                jQuery('.modal').removeClass("fade");
                jQuery('.modal').fadeIn();
                modal.close.then(function (result) {
                    console.log('result passed by modal');
                    console.log(result);
                    avatarSelected(result);
                });
            });
        }

        function avatarSelected(image) {
            console.log("avatar selected", image);
            //ModalService.close();
            $scope.profile.avatar = image.url;
        }

        function attachAvailableAvatarsToScope() {
            var i;
            $scope.images = [];
            for (i = 0; i <= 6; i++) {
                $scope.images.push(
                    {url: "http://media.azoomee.com/static/thumbs/oomee_0" + i + ".png"}
                );
            }
        }

        function creating() {
            return $stateParams.profileId === config.newProfileId || $scope.signupJourney;
        }

        function saveProfile() {
            var save;


            if ($scope.signupJourney) {
                if (!$scope.profile.birthday || !$scope.profile.birthmonth || !$scope.profile.birthyear) {
                    $scope.status.setErrorMsg(editProfileStrings.birthdayError);
                    return false;
                }
                $scope.profile.dob = $scope.profile.birthyear + "-" + $scope.profile.birthmonth + "-" + $scope.profile.birthday;
            }
            console.log("saving profile", $scope.profile);

            save = creating() ? userApi.addChildProfile : userApi.updateChildProfile;

            save($scope.profile)
                .then(function (profile) {
                    $rootScope.refreshChildProfiles();
                    console.log("saved profile: ", profile);
                    if (creating()) {
                        if (window.fbq) {
                            window.fbq('track', 'Purchase', {value: '0.00', currency: 'USD'});
                        }
                    }
                    if ($scope.signupJourney) {
                        $location.url('/signup/moreChildren/' + profile.id);
                    } else {
                        $location.url('/profile/child/' + profile.id);
                    }
                }, function (err) {
                    console.log("Error while saving profile ", $scope.profile, err);
                    $scope.status.setErrorMsg(creating() ? editProfileStrings.errorCreatingProfile : editProfileStrings.errorEditingProfile);
                });
        }

    }]);
    // ...

});

