define([
    'config',
    'angular',
    'app'
], function (config, angular, app) {
    app.service('billingApi', ['$http', 'userSession', '$q', function ($http, userSession, $q) {
        var billingApi = {
            updateCardDetails: function (cardDetails) {
                var url = config.billingUrl + '/user/' + userSession.getJWTUser() + '/paymentCard';
                return $http({
                    method: 'POST',
                    url: url,
                    data: cardDetails
                });
            },
            getBillingStatus: function () {
                return $http.get(config.billingUrl + '/user/' + userSession.getJWTUser() + '/billingStatus')
                    .then(function (resp) {
                        var billingStatus = resp.data;
                        billingStatus.isPaidSubscriber = billingStatus.billingStatus === "SUBSCRIBED" || billingStatus.billingStatus === "FREE_TRIAL";
                        return billingStatus;
                    }, function (err) {

                        return $q.reject(err);
                    });
            },
            updateBillingCycle: function (billingCycle) {
                var patch = {
                    billingCycle: billingCycle
                };
                return $http.patch(config.billingUrl + '/user/' + userSession.getJWTUser() + '/billingCycle', patch)
                    .then(function (resp) {
                        return resp.data;
                    }, function (err) {

                        return $q.reject(err);
                    });
            },
            addVoucher: function (voucherCode) {
                return $http.patch(config.billingUrl + "/user/" + userSession.getJWTUser() + "/voucher", {
                    voucherCode: voucherCode
                }).then(function (resp) {
                    return resp.data;
                }, function (err) {
                    console.log("There was a problem adding a voucher", err);
                    return $q.reject(err);
                });
            },
            getPlans: function () {
                return $http.get(config.billingUrl + "/user/" + userSession.getJWTUser() + "/plans")
                    .then(function (resp) {
                        return resp.data;
                    }, function (err) {
                        console.log("There was a problem retrieving the available plans for the user", err);
                        return $q.reject(err);
                    });
            }
        };
        return billingApi;
    }])
});
