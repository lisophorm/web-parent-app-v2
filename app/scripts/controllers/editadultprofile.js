'use strict';

/**
 * @ngdoc function
 * @name yoAngularifyApp.controller:EditadultprofileCtrl
 * @description
 * # EditadultprofileCtrl
 * Controller of the yoAngularifyApp
 */

define(['app', 'angular', 'jquery', 'underscore', 'azStatusBoard', "ModalcontrollerCtrl", "ngToast"], function (app, angular, jQuery, _) {
    app.controller('EditadultprofileCtrl', ['$scope', 'editAdultProfileStrings', '$stateParams', 'userApi', '$window', '$location', 'analytics', 'ModalService', "ngToast", function ($scope, editAdultProfileStrings, $stateParams, userApi, $window, $location, analytics, ModalService, ngToast) {
        $scope.title = "Editadultprofile page";
        $scope.strings = editAdultProfileStrings;
        attachAvailableAvatarsToScope();
        $scope.showAvatarOptions = showAvatarOptions;
        $scope.cancelEditing = cancelEditing;
        $scope.saveProfile = saveProfile;

        userApi.getAdultProfile().then(attachProfileToScope);

        $scope.showToast = function () {

            ngToast.warning('La marianna la va in campagna...');

        }

        function attachAvailableAvatarsToScope() {
            $scope.images = [];
            for (var i = 1; i <= 10; i++) {
                $scope.images.push(
                    {url: "https://media.azoomee.ninja/static/assets/oomeez/parent_" + i + ".png"}
                );
            }
        }

        function saveProfile() {


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
                //templateUrl: "/views/modals/template.html",
                templateUrl: "/views/gallery/gallery.modal.html",
                controller: "ModalcontrollerCtrl",
                scope: $scope
            }).then(function (modal) {

                //it's a bootstrap element, use 'modal' to show it
                // modal.element.modal();
                jQuery('.modal').removeClass("fade");
                jQuery('.modal').fadeIn();
                modal.close.then(function (result) {



                    avatarSelected(result);
                });
            });
        }

    }]);
    // ...

});

