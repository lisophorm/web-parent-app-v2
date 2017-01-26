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
                updateAdultProfile: function (updatedProfile) {
                    console.log("*********** update adult profile", updatedProfile);
                    return $http({
                        url: config.userUrl + '/adult/' + updatedProfile.id,
                        method: "PATCH",
                        data: updatedProfile
                    }).then(null, function (err) {
                        console.log('failed to update adult profile', profilePatch);
                        return Promise.reject(err);
                    });
                },
                addChildProfile: function (newProfile) {
                    var profileToPost = {
                        profileName: newProfile.profileName,
                        dob: formatDate(newProfile.dob),
                        sex: newProfile.sex,
                        avatar: newProfile.avatar,
                        password: newProfile.password
                    };
                    return $http({
                        url: config.userUrl + '/child/',
                        method: "POST",
                        data: profileToPost
                    })
                        .then(function (newProfile) {
                            console.log('new profile', newProfile);
                            //refreshChildren();
                            //sharingApi.refreshConversations();
                            return newProfile;
                        }, function (err) {
                            console.log('failed to create child profile', newProfile);
                            return Promise.reject(err);
                        })
                }
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

