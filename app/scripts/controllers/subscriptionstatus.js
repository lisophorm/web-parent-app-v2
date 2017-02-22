'use strict';

/**
 * @ngdoc function
 * @name yoAngularifyApp.controller:SubscriptionstatusCtrl
 * @description
 * # SubscriptionstatusCtrl
 * Controller of the yoAngularifyApp
 */

define(['app', 'angular', 'addCard'],
    function (app, angular) {
        app.controller('SubscriptionstatusCtrl',
            ["$scope", 'subscriptionStatusStrings', '$stateParams', 'billingApi', '$location', 'addCardService', 'analytics',
                function ($scope, subscriptionStatusStrings, $stateParams, billingApi, $location, addCardService, analytics) {
                    $scope.title = "Subscriptionstatus page";
                    //
                    // init
                    //
                    $scope.signupJourney = ($location.path().indexOf('signup') !== -1);
                    $scope.displayStatus = false;
                    $scope.navigateToSignupEnd = navigateToSignupEnd;
                    billingApi.getBillingStatus()
                        .then(function (billingStatus) {
                            if (!billingStatus.isPaidSubscriber && !$scope.signupJourney) {
                                navigateToSubscriptionOffer();
                                return;
                            }
                            $scope.displayStatus = true;
                            $scope.billingStatus = billingStatus;
                        });
                    $scope.strings = subscriptionStatusStrings;
                    $scope.justSubscribed = $stateParams.justSubscribed;
                    $scope.subscriptionType = $stateParams.justSubscribed ? subscriptionStatusStrings.promotedToPremiumUser : subscriptionStatusStrings.alreadyPremiumUser;
                    setPaymentDetailsChangedListener();
                    analytics.newPage("subscriptionstatus");
                    //
                    //
                    function navigateToSubscriptionOffer() {
                        $location.path('/subscriptionoffer');
                    }

                    function paymentDetailsChanged() {
                        billingApi.getBillingStatus()
                            .then(function (billingStatus) {
                                $scope.billingStatus = billingStatus;
                                $scope.updatingDetails = false;
                            });
                    }

                    function setPaymentDetailsChangedListener() {
                        var listener = {
                            paymentDetailsChanged: paymentDetailsChanged,
                            paymentDetailsChangeFailed: function () {
                                $location.path("/cardrejection");
                            }
                        };
                        addCardService.setPaymentDetailsChangedListener(listener);
                        $scope.$on("$destroy", function () {
                            addCardService.removePaymentDetailsChangedListener(listener)
                        });
                    }

                    function navigateToSignupEnd() {
                        $location.path("/signup/end");
                    }
                }]);
        // ...

    });

