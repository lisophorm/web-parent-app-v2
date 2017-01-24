define([
    'angular',
    'config',
    'app'
], function (angular, config, app) {
    app.factory('passwordApi', ['$http', '$q', 'userSession', function ($http, Promise, userSession) {
        var passwordApi = {
            changePassword: function (oldPassword, newPassword) {
                var payload = {
                    newPassword: newPassword
                };
                if (oldPassword) {
                    payload.oldPassword = oldPassword;
                }
                return $http.patch(config.userUrl + '/v2/adult/' + userSession.getJWTUser() + '/password',
                    payload
                ).then(function (res) {
                    return res.data;
                }, function (err) {
                    console.log("error updating password: ", err);
                    return Promise.reject(err);
                });

            }
        };
        return passwordApi;
    }]);
});
