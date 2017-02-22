
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

                    return $http({
                        url: config.userUrl + '/adult/' + updatedProfile.id,
                        method: "PATCH",
                        data: updatedProfile
                    }).then(null, function (err) {

                        return Promise.reject(err);
                    });
                },
                getChildProfiles: function (adultProfileId) {

                    var defer = $q.defer();
                    $http({
                        method: 'GET',
                        url: config.userUrl + '/adult/' + adultProfileId + '/owns',
                        params: {
                            expand: 'true',
                            activeOnly: 'true'
                        }
                    })
                        .then(function (result) {

                            defer.resolve(result.data);
                        }, function (err) {

                            defer.reject(err);
                        });
                    return defer.promise;
                },
                getChildProfile: function (profileId) {
                    var defer = $q.defer();
                    $http({
                        url: config.userUrl + '/child/' + profileId,
                        method: "GET"
                    })
                        .then(function (result) {

                            defer.resolve(result.data);
                        }, function (err) {

                            defer.reject(err);
                        });
                    return defer.promise;
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

                            //refreshChildren();
                            //sharingApi.refreshConversations();
                            return newProfile.data;
                        }, function (err) {

                            return Promise.reject(err);
                        })
                },
                deleteChildProfile: function (profileToDelete) {
                    var profilePatch = {
                        id: profileToDelete.id,
                        profileName: profileToDelete.profileName,
                        dob: formatDate(profileToDelete.dob),
                        sex: profileToDelete.sex,
                        avatar: profileToDelete.avatar,
                        status: 'DELETED'
                    };
                    return $http({
                        url: config.userUrl + '/child/' + profileToDelete.id,
                        method: "PATCH",
                        data: profilePatch
                    }).then(function (newProfile) {

                        //refreshChildren();
                        //sharingApi.refreshConversations();
                        return Promise.resolve(newProfile.data);
                    }, function (err) {

                        return Promise.reject(err);
                    });
                },
                updateChildProfile: function (updatedProfile) {
                    var profilePatch = {
                        id: updatedProfile.id,
                        profileName: updatedProfile.profileName,
                        dob: formatDate(updatedProfile.dob),
                        sex: updatedProfile.sex,
                        avatar: updatedProfile.avatar
                    };
                    return $http({
                        url: config.userUrl + '/child/' + updatedProfile.id,
                        method: "PATCH",
                        data: profilePatch
                    }).then(function (newProfile) {

                        //refreshChildren();
                        //sharingApi.refreshConversations();
                        return Promise.resolve(newProfile.data);
                    }, function (err) {

                        return Promise.reject(err);
                    });
                },
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

