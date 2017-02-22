define(['userSession'], function (userSession) {
    describe("userSession", function () {
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
            localStorage.clear();
            spyOn($, 'cookie');
        });
        it('should return an object', function () {
            expect(typeof userSession({})).toBe('object');
        });
        describe('getters', function () {
            describe('getJWTkey', function () {
                it('should get from localstorage if it is defined', function () {
                    localStorage.setItem('az-auth-key', 'myValue');
                    expect(session.getJWTkey()).toBe('myValue');
                });
            });
            describe('getJWTUser', function () {
                it('should get from localstorage if it is defined', function () {
                    localStorage.setItem('az-auth-userId', 'myValue');
                    expect(session.getJWTUser()).toBe('myValue');
                });
            });
            describe('getJWTsecret', function () {
                it('should get from localstorage if it is defined', function () {
                    localStorage.setItem('az-auth-secret', 'myValue');
                    expect(session.getJWTsecret()).toBe('myValue');
                });
            });
            describe('getJWTUserName', function () {
                it('should get from localstorage if it is defined', function () {
                    localStorage.setItem('az-auth-userName', 'myValue');
                    expect(session.getJWTUserName()).toBe('myValue');
                });
            });
            describe('getAuthTokens', function () {
                it('should get from localstorage if it is defined, and parse as json', function () {
                    localStorage.setItem('az-auth-authTokens', '{"a":"myValue"}');
                    expect(session.getAuthTokens().a).toBe('myValue');
                });
            });
        });
        describe('changeSession', function () {
            it('should store the information about the user session in localStorage if it is defined', function () {
                var session = userSession({}),
                    token = {
                        "id": "3cf23153-9b86-460c-bfaf-59f26a006852",
                        "profileId": "47e30748-d522-4133-b46c-c745791a4c50",
                        "profileType": "PARENT",
                        "apiKey": "4WdA2NV2DkXEwCmlh4NmdA==",
                        "apiSecret": "K8eDMAXfZjFLIxAWAFNYrBsf8ObrqVf0TosCukTzQcU=",
                        "authTokens": "12345"
                    },
                    userName = 'John Doe';
                session.sessionChanged(userName, token);
                if (typeof(localStorage) !== undefined) {
                    expect(localStorage.getItem('az-auth-key')).toBe(token.apiKey);
                    expect(localStorage.getItem('az-auth-secret')).toBe(token.apiSecret);
                    expect(localStorage.getItem('az-auth-userId')).toBe(token.id);
                    expect(localStorage.getItem('az-auth-userName')).toBe(userName);

                }
            });
        });
        describe('changeSession to parent', function () {
            it('should store the key separately if a parent is passed', function () {
                var session = userSession({}),
                    token = {
                        "id": "3cf23153-9b86-460c-bfaf-59f26a006852",
                        "profileId": "47e30748-d522-4133-b46c-c745791a4c50",
                        "profileType": "PARENT",
                        "apiKey": "4WdA2NV2DkXEwCmlh4NmdA==",
                        "apiSecret": "K8eDMAXfZjFLIxAWAFNYrBsf8ObrqVf0TosCukTzQcU=",
                        "authTokens": "12345"
                    },
                    userName = 'John Doe';
                session.sessionChanged(userName, token, true);
                if (typeof(localStorage) !== undefined) {
                    expect(localStorage.getItem('az-auth-key')).toBe(token.apiKey);
                    expect(localStorage.getItem('az-auth-secret')).toBe(token.apiSecret);
                    expect(localStorage.getItem('az-auth-userId')).toBe(token.id);
                    expect(localStorage.getItem('az-auth-userName')).toBe(userName);
                    expect(localStorage.getItem('az-auth-parent-key')).toBe(token.apiKey);
                }
            });
        });
        describe('changeSession from parent', function () {
            it('should keep the parent key stored when switching away from parent', function () {
                var session = userSession({}),
                    token = {
                        "id": "3cf23153-9b86-460c-bfaf-59f26a006852",
                        "profileId": "47e30748-d522-4133-b46c-c745791a4c50",
                        "profileType": "PARENT",
                        "apiKey": "4WdA2NV2DkXEwCmlh4NmdA==",
                        "apiSecret": "K8eDMAXfZjFLIxAWAFNYrBsf8ObrqVf0TosCukTzQcU=",
                        "authTokens": "12345"
                    },
                    token2 = {
                        "id": "childID",
                        "profileId": "123",
                        "profileType": "CHILD",
                        "apiKey": "123",
                        "apiSecret": "123",
                        "authTokens": "6789"
                    },
                    childName = 'Jane Doe',
                    userName = 'John Doe';
                session.sessionChanged(userName, token, true);
                session.sessionChanged(childName, token2, false);
                if (typeof(localStorage) !== "undefined") {
                    expect(localStorage.getItem('az-auth-key')).toBe(token2.apiKey);
                    expect(localStorage.getItem('az-auth-secret')).toBe(token2.apiSecret);
                    expect(localStorage.getItem('az-auth-userId')).toBe(token2.id);
                    expect(localStorage.getItem('az-auth-userName')).toBe(childName);
                    expect(localStorage.getItem('az-auth-parent-key')).toBe(token.apiKey);
                }
            });
        });
    });
});
