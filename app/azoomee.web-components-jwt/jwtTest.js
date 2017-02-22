require(['userSession'], function (userSession) {
    describe("httpProviderSetup", function () {
        var interceptor;
        beforeEach(function () {
            $ = {
                cookie: {}
            };
            Base64 = {
                encode: {}
            };
            CryptoJS = {
                enc: {
                    Base64: {
                        stringify: {}
                    }
                },
                HmacSHA256: {}
            };
            $q = {
                when: function () {
                    return 'when';
                },
                reject: function (rejection) {
                    return 'reject:' + rejection;
                }
            };
            session = userSession({});
            interceptor = httpProviderSetup({}, session);

        });
        it('should return an object', function () {
            expect(typeof httpProviderSetup({})).toBe('object');
        });
        describe('permissionError', function () {
            it('without rejection, window should not redirect', function () {
                spyOn(interceptor, 'setLocation');
                interceptor.permissionError();
                expect(interceptor.setLocation).not.toHaveBeenCalled();
            });
            it('with rejection but no status, window should not redirect', function () {
                spyOn(interceptor, 'setLocation');
                interceptor.permissionError({});
                expect(interceptor.setLocation).not.toHaveBeenCalled();
            });
            it('with rejection and status should redirect to default', function () {
                spyOn(interceptor, 'setLocation');
                interceptor.permissionError({status: 401});
                expect(interceptor.setLocation).toHaveBeenCalledWith('/#/login/');
            });
            it('with rejection and status should redirect to value if passed', function () {
                var interceptor = httpProviderSetup({permissionPage: '/#/permissionPage'});
                spyOn(interceptor, 'setLocation');
                interceptor.permissionError({status: 401});
                expect(interceptor.setLocation).toHaveBeenCalledWith('/#/permissionPage');
            });
        });
        describe('authError', function () {
            it('without rejection, window should not redirect', function () {
                spyOn(interceptor, 'setLocation');
                interceptor.authError();
                expect(interceptor.setLocation).not.toHaveBeenCalled();
            });
            it('with rejection but no status, window should not redirect', function () {
                spyOn(interceptor, 'setLocation');
                interceptor.authError({});
                expect(interceptor.setLocation).not.toHaveBeenCalled();
            });
            it('with rejection and status should redirect to default', function () {
                spyOn(interceptor, 'setLocation');
                interceptor.authError({status: 421});
                expect(interceptor.setLocation).toHaveBeenCalledWith('/#/login/421');
            });
            it('with rejection and status should redirect to value if passed', function () {
                var interceptor = httpProviderSetup({authPage: '/#/authPage/'});
                spyOn(interceptor, 'setLocation');
                interceptor.authError({status: 401});
                expect(interceptor.setLocation).toHaveBeenCalledWith('/#/authPage/401');
            });
        });
        describe('buildSignature', function () {
            beforeEach(function () {
                spyOn(interceptor, 'getPath').and.returnValue('specialSting!@£$%^&*()?/><');
                spyOn(interceptor, 'getQueryParamsString').and.returnValue('queryString');
                spyOn(interceptor, 'getHeadersString').and.returnValue('headerString');
                spyOn(interceptor, 'buildToken').and.returnValue('token');
                spyOn(interceptor, 'buildBodyString').and.returnValue('bodyString');
            });
            it('request without data should build correctly', function () {
                var secret = 'secret',
                    config = {
                        method: 'METHOD',
                        url: 'http://this.url/here',
                        params: [],
                        headers: {}
                    },
                    expected = 'METHOD\nspecialSting!%40%C2%A3%24%25%5E%26*()%3F%2F%3E%3C\nqueryString\nheaderString\n';
                expect(interceptor.buildSignature(config, secret)).toBe('token');
                expect(interceptor.getPath).toHaveBeenCalledWith(config.url);
                expect(interceptor.getQueryParamsString).toHaveBeenCalledWith(config.params);
                expect(interceptor.getHeadersString).toHaveBeenCalledWith(config.headers, config.url, config);
                expect(interceptor.buildToken).toHaveBeenCalledWith(expected, secret);
            });
            it('request with data should build correctly', function () {
                var secret = 'secret',
                    config = {
                        method: 'METHOD',
                        url: 'http://this.url/here',
                        params: [],
                        headers: {},
                        data: 'alan'
                    },
                    expected = 'METHOD\nspecialSting!%40%C2%A3%24%25%5E%26*()%3F%2F%3E%3C\nqueryString\nheaderString\nbodyString';
                expect(interceptor.buildSignature(config, secret)).toBe('token');
                expect(interceptor.getPath).toHaveBeenCalledWith(config.url);
                expect(interceptor.getQueryParamsString).toHaveBeenCalledWith(config.params);
                expect(interceptor.getHeadersString).toHaveBeenCalledWith(config.headers, config.url, config);
                expect(interceptor.buildToken).toHaveBeenCalledWith(expected, secret);
            });
        });
        describe('getPath', function () {
            it('should return correct part of url', function () {
                expect(interceptor.getPath('http://www.test.com/rest/ofUrl')).toBe('/rest/ofUrl');
            });
            it('should return correct part of url when port is passed', function () {
                expect(interceptor.getPath('http://www.test.com:1234/rest/ofUrl')).toBe('/rest/ofUrl');
            });
        });
        describe('getHeadersString', function () {
            var headers = {
                    'X-AZ-REQ-DATETIME': 'DATETIME'
                },
                url = 'http://www.url.com',
                config = {};
            beforeEach(function () {
                spyOn(interceptor, 'getHostString').and.returnValue('hoststring');
            });
            it('should return correct header string without data', function () {
                expect(interceptor.getHeadersString(headers, url, config)).toBe('host=hoststring&x-az-req-datetime=datetime');
                expect(interceptor.getHostString).toHaveBeenCalledWith('http://www.url.com');
            });
            it('should return correct header string with data', function () {
                config.data = 'data';
                headers['Content-Type'] = 'application/json';
                expect(interceptor.getHeadersString(headers, url, config)).toBe('content-type=application%2Fjson&host=hoststring&x-az-req-datetime=datetime');
                expect(interceptor.getHostString).toHaveBeenCalledWith('http://www.url.com');
            });
        });
        describe('getQueryParamsString', function () {
            it('should return blank string if no params are passed', function () {
                expect(interceptor.getQueryParamsString({})).toBe('');
            });
            it('should string of query params', function () {
                expect(interceptor.getQueryParamsString({a: 'a', b: 'b'})).toBe('a=a&b=b');
                expect(interceptor.getQueryParamsString({a: 'a', b: 'b', c: 'c'})).toBe('a=a&b=b&c=c');
            });
            it('should lowercase and escape query params', function () {
                expect(interceptor.getQueryParamsString({A: 'A', B: '&?/><,.#'})).toBe('a=a&b=%26%3F%2F%3E%3C%2C.%23');
            });
        });
        describe('buildBody', function () {
            it('should send back correct base64 encoded string', function () {
                var config = {},
                    userId = 'userId',
                    secret = 'secret';
                spyOn(Date, 'now').and.returnValue(100000);
                spyOn(Base64, 'encode').and.returnValue('base64encoded');
                spyOn(session, 'getJWTUserName').and.returnValue('userName');
                spyOn(interceptor, 'getHost').and.returnValue('host');
                spyOn(interceptor, 'buildSignature').and.returnValue('signature');
                expect(interceptor.buildBody(config, userId, secret)).toEqual('base64encoded');
                expect(session.getJWTUserName).toHaveBeenCalled();
                expect(interceptor.getHost).toHaveBeenCalled();
                expect(interceptor.buildSignature).toHaveBeenCalledWith(config, secret);
                expect(Base64.encode).toHaveBeenCalledWith('{"iss":"userName","aud":"host","applicationClaim":{"signature":"signature"}}');
            });
        });
        describe('buildHeaderString', function () {
            it('should return correct value', function () {
                spyOn(Base64, 'encode').and.returnValue('base64encoded');
                expect(interceptor.buildHeaderString('key')).toBe('base64encoded');
                expect(Base64.encode).toHaveBeenCalledWith('{"alg":"HS256","kid":"key"}');
            });
        });
        describe('shouldSign', function () {
            it('url starting with http should return true', function () {
                expect(interceptor.shouldSign({url: 'http://www.fake.url'})).toBe(true);
            });
            it('url starting with https should return true', function () {
                expect(interceptor.shouldSign({url: 'https://www.fake.url'})).toBe(true);
            });
            it('url not starting with http(s) should return true', function () {
                expect(interceptor.shouldSign({url: '/relative/path'})).toBe(false);
            });
        });
        describe('buildBodyString', function () {
            it('Should return empty string if passed no value', function () {
                expect(interceptor.buildBodyString()).toBe('');
            });
            it('Should return encoded version if passed object', function () {
                window.angular = window.angular || {
                        toJson: function () {
                        }
                    };
                spyOn(Base64, 'encode').and.returnValue('base64encoded');
                spyOn(angular, 'toJson').and.returnValue('{"a":"b","c":true,"d":15}');
                expect(interceptor.buildBodyString({a: 'b', c: true, d: 15})).toBe('base64encoded');
                expect(Base64.encode).toHaveBeenCalledWith('{"a":"b","c":true,"d":15}');
            });
            it('Should return encoded version if passed string', function () {
                spyOn(Base64, 'encode').and.returnValue('base64encoded');
                expect(interceptor.buildBodyString('This is a string')).toBe('base64encoded');
                expect(Base64.encode).toHaveBeenCalledWith('This is a string');
            });
        });
        describe('getTimeStamp', function () {
            it('should call correct methods', function () {
                var spys = {
                        format: function () {
                        }
                    },
                    utc = function () {
                        return {format: spys.format};
                    };
                window.moment = function () {
                    return {utc: utc};
                };
                spyOn(spys, 'format').and.returnValue('timestamp');
                expect(interceptor.getTimeStamp()).toBe('timestampZ');
                expect(spys.format).toHaveBeenCalledWith('YYYY-MM-DDTHH:mm:ss');
            });
        });
        describe('buildToken', function () {
            it('should call library correctly', function () {
                spyOn(CryptoJS, 'HmacSHA256').and.returnValue('encodedString');
                spyOn(CryptoJS.enc.Base64, 'stringify').and.returnValue('stringValue');
                expect(interceptor.buildToken('claimsString', 'secret')).toBe('stringValue');
                expect(CryptoJS.HmacSHA256).toHaveBeenCalledWith('claimsString', 'secret');
            });
        });
        describe('generateToken', function () {
            it('should return correct token', function () {
                var timestamp = 'time',
                    config = 'config',
                    userId = 'userId',
                    secret = 'secret',
                    key = 'key';
                spyOn(interceptor, 'buildHeaderString').and.returnValue('headerString');
                spyOn(interceptor, 'buildBody').and.returnValue('bodyString');
                spyOn(interceptor, 'buildToken').and.returnValue('tokenString');
                expect(interceptor.generateToken(timestamp, config, userId, secret, key)).toBe('headerString.bodyString.tokenString');
                expect(interceptor.buildHeaderString).toHaveBeenCalledWith(key);
                expect(interceptor.buildBody).toHaveBeenCalledWith(config, userId, secret);
                expect(interceptor.buildToken).toHaveBeenCalledWith('headerString.bodyString', secret);


            });
        });
        describe('getHostString', function () {
            it('Should return correct host name', function () {
                expect(interceptor.getHostString('http://www.thisdomain.com/not/this?bit=no')).toBe('www.thisdomain.com');
                expect(interceptor.getHostString('http://thisdomain.com/not/this?bit=no')).toBe('thisdomain.com');
            });

        });
        describe('signRequest', function () {
            beforeEach(function () {
                spyOn(interceptor, 'getTimeStamp').and.returnValue('Timestamp');
                spyOn(interceptor, 'generateToken').and.returnValue('token');

            });
            it('Should set timestamp header correctly', function () {
                var config = {
                        headers: {}
                    },
                    returnedConfig = interceptor.signRequest(config, 'secret', 'key', 'userId');
                expect(returnedConfig).toBe(config);
                expect(returnedConfig.headers['X-AZ-REQ-DATETIME']).toBe('Timestamp');
                expect(returnedConfig.headers['Content-Type']).toBeUndefined();
            });
            it('Should set content type header when data is passed', function () {
                var config = {
                        headers: {},
                        data: 'datastring'
                    },
                    returnedConfig = interceptor.signRequest(config, 'secret', 'key', 'userId');
                expect(returnedConfig).toBe(config);
                expect(returnedConfig.headers['X-AZ-REQ-DATETIME']).toBe('Timestamp');
                expect(returnedConfig.headers['Content-Type']).toBe('application/json;charset=UTF-8');
            });
            it('Should not change the content type header if it is already present', function () {
                var config = {
                        headers: {
                            'Content-Type': 'application/svg+xml'
                        },
                        data: 'datastring'
                    },
                    returnedConfig = interceptor.signRequest(config, 'secret', 'key', 'userId');
                expect(returnedConfig.headers['Content-Type']).toBe('application/svg+xml');
            });
            it('Should set correct auth token', function () {
                var config = {
                        headers: {}
                    },
                    returnedConfig = interceptor.signRequest(config, 'secret', 'key', 'userId');
                expect(returnedConfig).toBe(config);
                expect(returnedConfig.headers['X-AZ-AUTH-TOKEN']).toBe('token');
            });
        });
        describe('interceptor', function () {
            var $httpProvider;
            beforeEach(function () {
                $httpProvider = {
                    interceptors: []
                };
                interceptor.interceptor($httpProvider);
            });
            it('Should push interceptor into $httpProvide', function () {

                expect($httpProvider.interceptors.length).toBe(1);
                expect($httpProvider.interceptors[0][0]).toBe('$q');
                expect(typeof $httpProvider.interceptors[0][1]).toBe('function');
            });
            describe('interceptor methods', function () {
                describe('request', function () {
                    var requestFunction;

                    beforeEach(function () {
                        requestFunction = $httpProvider.interceptors[0][1]($q).request;
                        spyOn(interceptor, 'signRequest');
                    });
                    it('should call signRequest if it is needed', function () {
                        var config = {};
                        spyOn(session, 'getJWTkey').and.returnValue('key');
                        spyOn(session, 'getJWTsecret').and.returnValue('secret');
                        spyOn(session, 'getJWTUser').and.returnValue('user');
                        spyOn(interceptor, 'shouldSign').and.returnValue(false);
                        expect(requestFunction(config)).toBe(config);
                        expect(interceptor.signRequest).not.toHaveBeenCalled();
                        expect(interceptor.shouldSign).toHaveBeenCalledWith(config);

                    });
                    it('should not sign request with no key', function () {
                        var config = {};
                        spyOn(session, 'getJWTkey').and.returnValue(undefined);
                        spyOn(session, 'getJWTsecret').and.returnValue('secret');
                        spyOn(session, 'getJWTUser').and.returnValue('user');
                        spyOn(interceptor, 'shouldSign').and.returnValue(true);
                        expect(requestFunction(config)).toBe(config);
                        expect(interceptor.signRequest).not.toHaveBeenCalled();

                    });
                    it('should not sign request with no user', function () {
                        var config = {};
                        spyOn(session, 'getJWTkey').and.returnValue('key');
                        spyOn(session, 'getJWTsecret').and.returnValue('secret');
                        spyOn(session, 'getJWTUser').and.returnValue(undefined);
                        spyOn(interceptor, 'shouldSign').and.returnValue(true);
                        expect(requestFunction(config)).toBe(config);
                        expect(interceptor.signRequest).not.toHaveBeenCalled();

                    });
                    it('should  sign request with valid request', function () {
                        var config = {};
                        spyOn(session, 'getJWTkey').and.returnValue('key');
                        spyOn(session, 'getJWTsecret').and.returnValue('secret');
                        spyOn(session, 'getJWTUser').and.returnValue('user');
                        spyOn(interceptor, 'shouldSign').and.returnValue(true);
                        requestFunction(config);
                        expect(interceptor.signRequest).toHaveBeenCalled();

                    });
                });
                describe('requestError', function () {
                    var requestErrorFunction;
                    beforeEach(function () {
                        requestErrorFunction = $httpProvider.interceptors[0][1]($q).requestError;
                    });
                    it('Should pass through the rejection', function () {
                        var rejection = 'Rejected';
                        expect(requestErrorFunction(rejection)).toBe('reject:' + rejection);
                    });
                });
                describe('response', function () {
                    var responseFunction;
                    beforeEach(function () {
                        responseFunction = $httpProvider.interceptors[0][1]($q).response;
                    });
                    it('Should pass through the response', function () {
                        var response = 'response';
                        expect(responseFunction(response)).toBe(response);
                        expect(responseFunction()).toBe('when');
                    });
                });
                describe('responseError', function () {
                    var responseFunction;
                    beforeEach(function () {
                        responseErrorFunction = $httpProvider.interceptors[0][1]($q).responseError;
                    });
                    it('Should pass through the rejection', function () {
                        var rejection = 'Rejected';
                        expect(responseErrorFunction(rejection)).toBe('reject:' + rejection);
                    });
                    it('Should call auth error on correct error codes', function () {
                        var status = {status: "401"};
                        spyOn(interceptor, 'authError');
                        responseErrorFunction(status);
                        expect(interceptor.authError).toHaveBeenCalledWith(status);
                        status.status = "419";
                        expect(interceptor.authError).toHaveBeenCalledWith(status);
                    });
                    it('should call permission error on 403', function () {
                        var status = {status: "403"};
                        spyOn(interceptor, 'permissionError');
                        responseErrorFunction(status);
                        expect(interceptor.permissionError).toHaveBeenCalledWith(status);
                    });
                });
            });
        });

        describe('getHost', function () {
            it('Should return string', function () {
                expect(typeof interceptor.getHost()).toBe('string');
            });
        });
        describe('setLocation', function () {
            it('Should return string', function () {
                //expect(interceptor.setLocation('/home')).toBe(true);
            });
        });
    });
});
