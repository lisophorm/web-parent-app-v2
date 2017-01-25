'use strict';

/**
 * @ngdoc function
 * @name yoAngularifyApp.controller:EditadultprofileCtrl
 * @description
 * # EditadultprofileCtrl
 * Controller of the yoAngularifyApp
 */

define(['app', 'angular', 'underscore', 'azStatusBoard', "ModalcontrollerCtrl"], function (app, angular, _) {
    app.controller('EditadultprofileCtrl', ['$scope', 'editAdultProfileStrings', '$stateParams', 'userApi', '$window', '$location', 'analytics', 'ModalService', function ($scope, editAdultProfileStrings, $stateParams, userApi, $window, $location, analytics, ModalService) {
        $scope.title = "Editadultprofile page";
        $scope.strings = editAdultProfileStrings;
        attachAvailableAvatarsToScope();
        $scope.showAvatarOptions = showAvatarOptions;
        $scope.cancelEditing = cancelEditing;
        $scope.saveProfile = saveProfile;

        userApi.getAdultProfile().then(attachProfileToScope)

        function attachAvailableAvatarsToScope() {
            $scope.images = [];
            for (var i = 1; i <= 10; i++) {
                $scope.images.push(
                    {url: "https://media.azoomee.ninja/static/assets/oomeez/parent_" + i + ".png"}
                );
            }
        }

        function saveProfile() {
            console.log("saving profile", $scope.profile);

            userApi.updateAdultProfile($scope.profile)
                .then(function (profile) {
                    console.log("saved profile: ", $scope.profile, profile);
                    $location.url('/profile/adult/' + $scope.profile.id);
                }, function (err) {
                    console.log("Error while saving profile ", $scope.profile, err);
                    $scope.status.setErrorMsg(editAdultProfileStrings.errorEditingProfile);
                });
        }

        function cancelEditing() {
            $window.history.back();
        }

        function avatarSelected(image) {
            console.log("avatar selected", image);
            //ModalService.close();
            $scope.profile.avatar = image.url;
        }

        function attachProfileToScope(profile) {
            console.log('attach profile to scope', profile);
            $scope.profile = _.clone(profile);
        }

        // test stuff
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
                modal.close.then(function (result) {

                    console.log('result passed by modal');
                    console.log(result);
                    avatarSelected(result);
                });
            });
        }

    }]);
    // ...
    //or use angular.module to create a new module
});

