'use strict';

/**
 * @ngdoc function
 * @name yoAngularifyApp.controller:VoucherredemptionCtrl
 * @description
 * # VoucherredemptionCtrl
 * Controller of the yoAngularifyApp
 */

define(['app', 'angular'], function (app, angular) {
    app.controller('VoucherredemptionCtrl', ['$scope', 'voucherRedemptionStrings', 'billingApi', '$state', '$q', 'analytics', function ($scope, voucherRedemptionStrings, billingApi, $state, $q, analytics) {
        $scope.strings = voucherRedemptionStrings;
        $scope.submit = submit;
        $scope.loading = false;
        Pace.stop();
        function submit() {
            if (!$scope.voucherCode) {
                return;
            }
            $scope.errorMsg = "";
            $scope.loading = true;
            Pace.start();
            billingApi.addVoucher($scope.voucherCode)
                .then(
                    voucherSuccess,
                    voucherFailure
                );
        }

        function voucherSuccess(voucher) {
            if (voucher) {
                analytics.sendEvent({type: 'voucherCodeRedeemed', eventData: {campaign: voucher.campaign}});
                if (voucher.organization === "O2") {
                    navigateToSubscriptionStatus();
                    return;
                }
                navigateToSubscriptionOffer();
            }
        }

        function navigateToSubscriptionOffer() {
            $state.go('subscriptionOffer');
        }

        function navigateToSubscriptionStatus() {
            $state.go('subscriptionstatus');
        }

        function voucherFailure(err) {
            console.log("****** network error");
            analytics.sendEvent({type: 'invalidVoucherCodeOnRedemption', eventData: {httpStatus: err.status}});
            if (err) {
                if (err.status === 409) {
                    $scope.errorMsg = voucherRedemptionStrings.voucherAlreadyUsedError;
                } else if (err.status === 410) {
                    $scope.errorMsg = voucherRedemptionStrings.voucherExpiredError;
                } else {
                    $scope.errorMsg = voucherRedemptionStrings.voucherError;
                }
            }
            $scope.loading = false;
            Pace.stop();
            return $q.reject(err);
        }
    }]);
    // ...

});

