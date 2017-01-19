'use strict';

/**
 * @ngdoc function
 * @name yoAngularifyApp.controller:SignupendCtrl
 * @description
 * # SignupendCtrl
 * Controller of the yoAngularifyApp
 */

define(['app', 'angular'], function (app, angular) {
    app.controller('SignupendCtrl', ["$scope", 'billingApi', 'analytics', '$rootScope', 'signupEndStrings', 'totsTooSignupEndStrings', function ($scope, billingApi, analytics, $rootScope, signupEndStrings, totsTooSignupEndStrings) {
        $scope.title = "Signupend page";
        console.log('WITHIN SIGNUP END');
        var platformName,
            isDesktop;

        if ($rootScope.totstoo) {
            signupEndStrings = totsTooSignupEndStrings;
        }
        $scope.strings = signupEndStrings;

        $scope.loading = true;
        $scope.isDesktop = checkIsDesktop;

        billingApi.getBillingStatus()
            .then(function (billingStatus) {
                $scope.loading = false;
                $scope.subscriptionStatus = billingStatus.billingStatus;
                $scope.paidSubscriber = billingStatus.isPaidSubscriber;
                $scope.billingCycle = billingStatus.billingCycle;
                if (billingStatus.vouchers && billingStatus.vouchers[0]) {
                    if (billingStatus.vouchers[0].organization === "O2") {
                        $scope.sponsor = "O2";
                    } else {
                        $scope.sponsor = "other";
                    }
                    if (billingStatus.vouchers[0].percentageDiscount === 100) {
                        $scope.subscriptionDurationInCycles = billingStatus.vouchers[0].durationInCycles;
                    } else {
                        $scope.subscriptionDurationInCycles = 1;
                    }
                }
            });
        analytics.trackLink("#appleStoreLink", {type: "appStoreLinkFollowed", eventData: {store: "apple"}});
        analytics.trackLink("#googlePlayLink", {type: "appStoreLinkFollowed", eventData: {store: "googlePlay"}});
        analytics.trackLink("#goToAppAppleStoreLink", {type: "appStoreLinkFollowed", eventData: {store: "apple"}});
        analytics.trackLink("#goToAppGooglePlayLink", {type: "appStoreLinkFollowed", eventData: {store: "googlePlay"}});

        $scope.platformName = platformName = getPlatformName();
        isDesktop = platformName != 'Android' && platformName != 'iOS';

        function checkIsDesktop() {
            return isDesktop;
        }

        function getPlatformName() {
            if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
                return "iOS";
            }
            if (/Android/.test(navigator.userAgent)) {
                return "Android";
            }
            return "other";
        }

    }]);

    // ...
    //or use angular.module to create a new module
});

