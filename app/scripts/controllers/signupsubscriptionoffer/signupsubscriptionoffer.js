/**
 * @ngdoc function
 * @name yoAngularifyApp.controller:SignupsubscriptionofferCtrl
 * @description
 * # SignupsubscriptionofferCtrl
 * Controller of the yoAngularifyApp
 */

define(['app', 'angular', 'addCard'], function (app, angular) {
    app.controller('SignupsubscriptionofferCtrl',
        ['$scope', 'signupSubscriptionOfferStrings', 'totstooSignupSubscriptionOfferStrings', 'billingApi', '$location', 'addCardService', '$q', '$timeout', 'analytics', '$rootScope',
            function ($scope, signupSubscriptionOfferStrings, totstooSignupSubscriptionOfferStrings, billingApi, $location, addCardService, $q, $timeout, analytics, $rootScope) {
                // init
                if ($rootScope.totstoo) {
                    signupSubscriptionOfferStrings = totstooSignupSubscriptionOfferStrings;
                }
                $scope.money = function (money) {
                    return "£" + new Number(money).toFixed(2);
                };  //TODO: this could be a factory somewhere
                $scope.strings = signupSubscriptionOfferStrings;
                $scope.shouldRequestCardDetails = shouldRequestCardDetails;
                $scope.changeCard = false;
                $scope.buy = buy;
                $scope.navigateToSignupEnd = navigateToSignupEnd;
                attachBillingStatusToScope()
                    .then(attachPlanToScope);
                registerListenerForPaymentDetailsChange();
                // funcs
                //
                function attachPlanToScope() {
                    return billingApi.getPlans()
                        .then(function (plans) {
                            for (var i = 0; i < plans.length; i++) {
                                if (plans[i].billingCycle === $scope.voucherBillingCycle) {
                                    $scope.planTotalPrice = plans[i].totalPrice;
                                    $scope.planDiscountPrice = plans[i].discountPrice;
                                    $scope.planDiscountPrice = plans[i].discountPrice;
                                    $scope.planBillingCycle = plans[i].billingCycle;
                                    break;
                                }
                            }
                        });
                }

                function attachBillingStatusToScope() {
                    return billingApi.getBillingStatus()
                        .then(function (status) {
                            $scope.billingStatus = status;
                            $scope.voucherDurationInCycles = status.vouchers[0].durationInCycles;
                            $scope.voucherBillingCycle = status.vouchers[0].billingCycle;
                            $scope.voucherPercentageDiscount = status.vouchers[0].percentageDiscount;

                        }, function (err) {
                        });
                }

                function shouldRequestCardDetails() {
                    return $scope.changeCard || !($scope.billingStatus && ($scope.billingStatus.paymentCardNumber != null));
                }

                function buy() {
                    billingApi.updateBillingCycle($scope.planBillingCycle)
                        .then(function () {
                            analytics.sendEvent({
                                type: 'cardDetailsEnteredOnSignup',
                                eventData: {subscriptionPlan: $scope.planBillingCycle}
                            });
                            navigateToSignupEnd();
                        }, function () {
                            $scope.status.setErrorMsg(signupSubscriptionOfferStrings.updateBillingCycleError);
                        });
                }

                function paymentFailed() {
                    analytics.sendEvent({type: 'paymentFailedOnSignup'});
                    $location.path("/cardrejection");
                }

                function registerListenerForPaymentDetailsChange() {
                    var paymentDetailsChangedListener = {
                        paymentDetailsChanged: buy,
                        paymentDetailsChangeFailed: paymentFailed
                    };
                    $scope.$on("$destroy", function () {
                        addCardService.removePaymentDetailsChangedListener(paymentDetailsChangedListener)
                    });
                    addCardService.setPaymentDetailsChangedListener(paymentDetailsChangedListener);
                }

                function navigateToSignupEnd() {
                    $location.path("/signup/end");
                }
            }]);
    // ...
    //or use angular.module to create a new module
});

