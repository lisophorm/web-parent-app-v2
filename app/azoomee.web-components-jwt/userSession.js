
define([''], function () {
    var userSession = function (newSessionCallback, sessionExpiredCallback) {
        var _newSessionCallback = newSessionCallback,
            _sessionExpiredCallback = sessionExpiredCallback,
            storage = {
                retrieveValue: function (localStorageKey) {
                    return localStorage.getItem(localStorageKey);
                },
                storeValue: function (key, value) {
                    localStorage.setItem(key, value);
                }
            },
            localStore = {},
            memoryStorage = {
                retrieveValue: function (key) {
                    return localStore[key];
                },
                storeValue: function (key, value) {
                    localStore[key] = value;
                }
            },
            authSession = {
                handleNew: function (expiry, sessionId) {
                    if (authSession.sessionExpiry) {
                        clearTimeout(authSession.sessionExipry);
                    }
                    authSession.storeExpiry(expiry);

                    if (typeof _newSessionCallback === "function") {
                        _newSessionCallback(sessionId);
                    }
                    if (publicFunctions.getSessionType() === 'parent') {
                        storage.storeValue('az-auth-parent-authSession', sessionId);
                    }
                    storage.storeValue('az-auth-authSession', sessionId);
                },
                storeExpiry: function (minExpiry) {
                    if (minExpiry === 0) {
                        return;
                    }
                    var now = new Date().getTime();

                    if (minExpiry > 300000) {
                        minExpiry = minExpiry - 300000;
                    }
                    expiryTime = minExpiry + now;
                    authSession.sessionExipry = setTimeout(function () {
                        if (typeof _sessionExpiredCallback === "function") {
                            _sessionExpiredCallback();
                        }
                    }, minExpiry);

                    storage.storeValue('az-auth-session-expiry', expiryTime);
                },
                checkExpiry: function () {
                    var now = new Date().getTime(),
                        expiry = storage.retrieveValue('az-auth-session-expiry');
                    if (now > expiry && _sessionExpiredCallback) {
                        _sessionExpiredCallback();
                        return;
                    }
                    if (typeof _newSessionCallback === "function") {
                        _newSessionCallback(publicFunctions.getAuthSession());
                    }
                }
            },
            checkForLocalStorage = function () {
                try {
                    localStorage.setItem("azoomeeLocalStorage", "true");
                    return true;
                } catch (e) {
                    return false;
                }
            },
            publicFunctions = {
                getJWTkey: function () {
                    return storage.retrieveValue('az-auth-key');
                },
                getJWTUser: function () {
                    return storage.retrieveValue('az-auth-userId');
                },
                getJWTsecret: function () {
                    return storage.retrieveValue('az-auth-secret');
                },
                getJWTUserName: function () {
                    return storage.retrieveValue('az-auth-userName');
                },
                getParentKey: function () {
                    return storage.retrieveValue('az-auth-parent-key');
                },
                getAuthSession: function () {
                    return storage.retrieveValue('az-auth-authSession');
                },
                getSessionType: function () {
                    return storage.retrieveValue('az-auth-type');
                },
                getUserMeta: function () {
                    var metaData = storage.retrieveValue('az-auth-meta');
                    if (typeof metaData === "string") {
                        return JSON.parse(metaData || "{}");
                    }
                    return metaData;
                },
                updateUserMeta: function (key, value) {
                    var metaData = publicFunctions.getUserMeta();
                    metaData[key] = value;
                    storage.storeValue('az-auth-meta', JSON.stringify(metaData));
                    return metaData;
                },
                getParentPinNumberOnLogin: function () {
                    return storage.retrieveValue('az-auth-parent-pinNumberOnLogin');
                },
                switchToParentSession: function () {
                    var userSessionID = storage.retrieveValue('az-auth-parent-authSession');
                    storage.storeValue('az-auth-userName', storage.retrieveValue('az-auth-parent-userName'));
                    storage.storeValue('az-auth-key', storage.retrieveValue('az-auth-parent-key'));
                    storage.storeValue('az-auth-secret', storage.retrieveValue('az-auth-parent-secret'));
                    storage.storeValue('az-auth-userId', storage.retrieveValue('az-auth-parent-userId'));
                    storage.storeValue('az-auth-profileId', storage.retrieveValue('az-auth-parent-profileId'));
                    storage.storeValue('az-auth-meta', storage.retrieveValue('az-auth-parent-meta'));
                    storage.storeValue('az-auth-type', 'parent');
                    authSession.handleNew(userSessionID);
                },
                updateAuthSession: function (expiry, sessionID) {
                    authSession.handleNew(expiry, sessionID);
                },
                sessionChanged: function (userName, newSession, parent) {
                    newSession.meta = JSON.stringify(newSession.meta) || '{}';
                    storage.storeValue('az-auth-userName', userName);
                    storage.storeValue('az-auth-key', newSession.apiKey);
                    storage.storeValue('az-auth-secret', newSession.apiSecret);
                    storage.storeValue('az-auth-userId', newSession.id);
                    storage.storeValue('az-auth-profileId', newSession.profileId);
                    storage.storeValue('az-auth-profileType', newSession.profileType);
                    storage.storeValue('az-auth-meta', newSession.meta);
                    if (parent === true) {
                        storage.storeValue('az-auth-parent-userName', userName);
                        storage.storeValue('az-auth-parent-key', newSession.apiKey);
                        storage.storeValue('az-auth-parent-secret', newSession.apiSecret);
                        storage.storeValue('az-auth-parent-userId', newSession.id);
                        storage.storeValue('az-auth-parent-profileId', newSession.profileId);
                        storage.storeValue('az-auth-parent-meta', newSession.meta);
                        storage.storeValue('az-auth-type', 'parent');
                        storage.storeValue('az-auth-parent-pinNumberOnLogin', newSession.pinNumber);
                    } else {
                        storage.storeValue('az-auth-type', 'child');
                    }
                    authSession.handleNew(newSession["cdn-expiry"], newSession["cdn-sessionid"]);
                },
                setOnSessionAvailable: function (onSessionAvailable) {
                    _newSessionCallback = onSessionAvailable;
                },
                setOnSessionExpired: function (onSessionExpired) {
                    _sessionExpiredCallback = onSessionExpired;
                }

            };
        if (!checkForLocalStorage()) {
            storage = memoryStorage;
        }
        authSession.checkExpiry();
        return publicFunctions;

    };
    return userSession;
});
