define([
    'app',
    'config',
    'angular'
], function (app, config, angular) {
    app.service('loginApi', ['$http', 'userSession', '$q', function ($http, userSession, $q) {
        var handleLoginResponse = function (userName, resp) {
                var loginSession = resp.data;
                loginSession.meta = loginSession.meta || {};
                if (resp.data.error === true) {
                    console.log("Invalid credentials");
                    return $q.reject(resp);
                }
                userSession.sessionChanged(userName, loginSession);
                if (window.trackJs) {
                    trackJs.addMetadata("user", loginSession.id);
                }
                return true;
            },
            loginEndPoint = config.authUrl + "/login",
            tokenLoginEndPoint = config.tokenLoginEndpoint,
            loginApi = {
                login: function (userName, password) {
                    return $http.post(loginEndPoint, {
                        userName: userName,
                        password: password
                    }).then(function (resp) {
                        return handleLoginResponse(userName, resp)
                    }, function (err) {
                        console.log("Login failed", err);
                        return $q.reject(err);
                    });
                },
                loginUsingToken: function (userName, token) {
                    return $http({
                        url: tokenLoginEndPoint,
                        method: "GET",
                        params: {
                            token: token
                        }
                    }).then(function (resp) {
                        return handleLoginResponse(userName, resp);
                    }, function (err) {
                        console.log("Login with token failed", err);
                        return $q.reject(err);
                    });
                }
            };
        return loginApi;
    }])
});
