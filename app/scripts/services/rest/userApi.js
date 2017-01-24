console.log('within userAPI')
define([
    'app',
    'config',
    'angular',
    'moment'
], function (app, config, angular, moment) {
    app.service('userApi', ['$q', '$http', 'userSession', function ($q, $http, userSession) {
        var profiles = [],
            userApi = {

                isUserVerified: function () {
                    return userApi.getAdultProfile().then(function (profile) {
                        if (profile && profile.actorStatus.toUpperCase() === "CREATED") {
                            return false;
                        }
                        return true;
                    });
                },
                getAdultProfile: function () {
                    var profileId = userSession.getJWTUser();
                    return $http({
                        url: config.userUrl + '/adult/' + profileId,
                        method: "GET"
                    })
                        .then(function (adultProfile) {
                            ensureAvatarIsSet(adultProfile.data);
                            return adultProfile.data;
                        }, function (err) {
                            console.log("Failed to retrieve adult profile", profileId, err);
                            return Promise.reject(err);
                        });
                },
            };

        function ensureAvatarIsSet(profile) {
            console.log("*** ENSURE AVATAR IS SET");
            console.log(profile);
            if (!profile.avatar) {
                profile.avatar = config.defaultAvatar;
            }
        }


        function formatDate(date) {
            return moment(date).format("YYYY-MM-DD");
        }

        return userApi;
    }])
});

