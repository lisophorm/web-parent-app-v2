
define(['lib/Base64', 'lib/moment.js', 'lib/crypto-js.js'], function (Base64, moment, CryptoJS) {
    var httpProviderSetup = function (conf, session) {
        conf.cookies = conf.cookies || {};
        var interceptor = {
            permissionError: function (rejection) {
                if (conf.permissionErrorCallback && typeof conf.permissionErrorCallback === "function") {
                    conf.permissionErrorCallback(rejection);
                    return;
                }
                var permissionRedirect = conf.permissionPage || '/#/login/';
                if (rejection && rejection.status) {
                    interceptor.setLocation(permissionRedirect);
                    return;
                }
            },
            authError: function (rejection) {
                if (conf.authErrorCallback && typeof conf.authErrorCallback === "function") {
                    conf.authErrorCallback(rejection);
                    return;
                }
                if (rejection && rejection.status) {
                    var authRedirect = (conf.authPage || '/#/login/') + rejection.status;
                    interceptor.setLocation(authRedirect);
                    return;
                }
            },
            buildSignature: function (config, secret) {
                var signatureString = '';
                signatureString += config.method + '\n';
                signatureString += encodeURIComponent(interceptor.getPath(config.url)) + '\n';
                signatureString += interceptor.getQueryParamsString(config.params) + '\n';
                signatureString += interceptor.getHeadersString(config.headers, config.url, config) + '\n';
                if (config.data) {
                    signatureString += interceptor.buildBodyString(config.data);
                } else {
                    signatureString += '';
                }
                return interceptor.buildToken(signatureString, secret);
            },
            getPath: function (url) {
                var parser = document.createElement('a');
                parser.href = url;
                if (parser.pathname.charAt(0) !== "/") {
                    return "/" + parser.pathname;
                }
                return parser.pathname;
            },
            getHeadersString: function (headers, url, config) {
                var headerString = '';
                if (headers['Content-Type'] && config.data) {
                    headerString = "content-type=" + encodeURIComponent((headers['Content-Type']).toLowerCase()) + "&";
                }

                headerString += "host=" + encodeURIComponent(interceptor.getHostString(url).toLowerCase()) +
                    "&" + encodeURIComponent('X-AZ-REQ-DATETIME'.toLowerCase()) + "=" + encodeURIComponent((headers['X-AZ-REQ-DATETIME']).toLowerCase());
                return headerString;
            },
            getQueryParamsString: function (queryParams) {
                var keys = interceptor.getSortedKeyArray(queryParams),
                    key,
                    queryString = '',
                    first = true;
                for (key in keys) {
                    if (first === false) {
                        queryString += '&';
                    } else {
                        first = false;
                    }
                    queryString += encodeURIComponent(keys[key].toLowerCase()) + '=' + encodeURIComponent(queryParams[keys[key]].toLowerCase());
                }
                return queryString;
            },
            buildBody: function (config, userId, secret) {
                epochStamp = parseInt(Date.now() / 1000, 10);
                var body = {
                    iss: session.getJWTUser(),
                    aud: interceptor.getHost(),
                    applicationClaim: {
                        signature: interceptor.buildSignature(config, secret),
                        parentKey: session.getParentKey()
                    }
                };
                return Base64.encode(JSON.stringify(body));
            },
            buildHeaderString: function (azoomeeKey) {
                var headerString = '{',
                    headerObject = {
                        "alg": "HS256",
                        "kid": azoomeeKey
                    },
                    key,
                    keys,
                    first = true;
                keys = interceptor.getSortedKeyArray(headerObject);
                for (key in keys) {
                    if (first === false) {
                        headerString += ',';
                    } else {
                        first = false;
                    }
                    headerString += '"' + keys[key] + '":"' + headerObject[keys[key]] + '"';
                }
                headerString += '}';
                return Base64.encode(headerString);
            },
            shouldSign: function (config) {

                if (!config.url) {
                    return false;
                }

                //This is not much better than what is written below....
                if (conf.publicUrls && conf.publicUrls.indexOf(config.url) !== -1) {
                    return false;
                }
                //this is horrible - need to find a better way of doing this.....
                if (config.url.substring(config.url.length - 6, config.url.length) === '/login') {
                    return false;
                }
                if (config.url === 'https://media.azoomee.com/static/contentLayouts.json') {
                    return false;
                }
                if (config.url.substring(0, 4) === 'http') {
                    return true;
                }
                return false;
            },
            getSortedKeyArray: function (object) {
                var keys = [],
                    key;
                for (key in object) {
                    if (object.hasOwnProperty(key)) {
                        keys.push(key);
                    }
                }
                keys.sort();
                return keys;
            },
            buildBodyString: function (body) {
                if (typeof body === 'object') {
                    body = angular.toJson(body);
                }
                if (!body) {
                    return '';
                }
                return Base64.encode(body);
            },
            getTimeStamp: function () {
                return moment().utc().format('YYYY-MM-DDTHH:mm:ss') + 'Z';
            },
            buildToken: function (headerClaimsString, secret) {
                var hash = CryptoJS.HmacSHA256(headerClaimsString, secret);
                return CryptoJS.enc.Base64.stringify(hash);
            },
            generateToken: function (dateTimeStamp, config, userId, secret, key) {
                var jwtToken;
                jwtToken = interceptor.buildHeaderString(key);
                jwtToken += '.' + interceptor.buildBody(config, userId, secret);
                jwtToken += '.' + interceptor.buildToken(jwtToken, secret);
                return jwtToken;
            },
            getHostString: function (url) {
                var parser = document.createElement('a');
                parser.href = url;
                return parser.host.split(":")[0];
            },
            signRequest: function (config, azoomeeSecret, azoomeeKey, userId) {
                var dateTimeStamp = interceptor.getTimeStamp(),
                    jwtToken;
                config.headers['X-AZ-REQ-DATETIME'] = dateTimeStamp;
                if (config.data && !config.headers['Content-Type']) {
                    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
                }
                jwtToken = interceptor.generateToken(dateTimeStamp, config, userId, azoomeeSecret, azoomeeKey);
                config.headers['X-AZ-AUTH-TOKEN'] = jwtToken;
                return config;
            },
            interceptor: function ($httpProvider) {
                $httpProvider.interceptors.push(interceptor.getInterceptorFactory());
            },
            getInterceptorFactory: function () {
                return ['$q', function ($q) {
                    return {
                        'request': function (config) {
                            var canceller = $q.defer(),
                                azoomeeKey = session.getJWTkey(),
                                azoomeeSecret = session.getJWTsecret(),
                                userId = session.getJWTUser();
                            config.timeout = canceller.promise;
                            if (interceptor.shouldSign(config)) {
                                if (userId === 'undefined' || userId === 'null' || !userId || !azoomeeKey) {
                                    config.noUserCancel = true;
                                    canceller.resolve();
                                    return config;
                                }
                                config = interceptor.signRequest(config, azoomeeSecret, azoomeeKey, userId);
                            }
                            return config || $q.when(config);
                        },
                        'requestError': function (rejection) {
                            return $q.reject(rejection);
                        },
                        'response': function (response) {
                            return response || $q.when(response);
                        },
                        'responseError': function (rejection) {
                            if (rejection.config.noUserCancel === true) {
                                interceptor.authError({status: '401'});
                                rejection.status = 401;
                            } else if (rejection.status == "401" || rejection.status == "419") {
                                interceptor.authError(rejection);
                            } else if (rejection.status == "403") {
                                interceptor.permissionError(rejection);
                            }
                            return $q.reject(rejection);
                        }
                    };
                }];
            },
            setLocation: function (location) {
                var gotoLocation = window.location.href.indexOf('login=true');
                if (gotoLocation > -1) {
                    return;
                }
                location = location + '?login=true&goto=' + encodeURIComponent(window.location.href);
                window.location.href = location;
                return true;
            },
            getHost: function () {
                return document.location.host;
            }
        };
        return interceptor;
    };

    return httpProviderSetup;

});
