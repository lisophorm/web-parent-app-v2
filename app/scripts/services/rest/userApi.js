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
                }
            };

        function ensureAvatarIsSet(profile) {
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

