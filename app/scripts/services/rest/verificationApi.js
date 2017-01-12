define([
    'angular',
    'config',
    'app'
], function (angular, config, app) {
    app.factory('verificationApi', ['$http', '$q', function ($http, Promise) {
        var verificationApi = {
            verify: function (token) {
                return $http.get(config.userUrl + '/v2/adult/verify', {params: {"token": token}})
                    .then(function (resp) {
                        return resp.data;
                    }, function (err) {
                        console.log("Error while verifying e-mail address", err);
                        return Promise.reject(err);
                    });
            }
        };
        return verificationApi;
    }]);
});
