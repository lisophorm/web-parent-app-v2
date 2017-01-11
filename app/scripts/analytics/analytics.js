define([], function () {
    return function (app) {
        app.factory('analytics', function () {
            var analytics = {
                sendEvent: function (event) {
                    if (window.mixpanel) {
                        mixpanel.track(event.type, event.eventData);
                    }
                },
                updateUserId: function (userId) {
                    if (window.mixpanel) {
                        mixpanel.identify(userId);
                    }
                },
                signUpUserWithId: function (userId) {
                    if (window.mixpanel) {
                        mixpanel.alias(userId);
                    }
                },
                clearUserId: function () {
                    if (window.mixpanel) {
                        mixpanel.reset();
                    }
                },
                updateUserProperties: function (properties) {
                    if (window.mixpanel) {
                        mixpanel.people.set(properties);
                    }
                },
                setUserPropertiesOnce: function (properties) {
                    if (window.mixpanel) {
                        mixpanel.people.set_once(properties);
                    }
                },
                trackLink: function (linkId, event) {
                    if (window.mixpanel) {
                        mixpanel.track_links(linkId, event.type, event.eventData);
                    }
                },
                newPage: function (pageName, eventData) {
                    var extendedEventData = eventData || {};
                    extendedEventData.pageName = pageName;
                    analytics.sendEvent({type: "parentAppPageLoaded", eventData: extendedEventData});
                }
            };
            return {
                sendEvent: analytics.sendEvent,
                updateUserId: analytics.updateUserId,
                signUpUserWithId: analytics.signUpUserWithId,
                clearUserId: analytics.clearUserId,
                trackLink: analytics.trackLink,
                updateUserProperties: analytics.updateUserProperties,
                setUserPropertiesOnce: analytics.setUserPropertiesOnce,
                newPage: analytics.newPage
            };
        });
    };
});
