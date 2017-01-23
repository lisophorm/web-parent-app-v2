/**
 * @ngdoc function
 * @name yoAngularifyApp.controller:SubscriptionofferCtrl
 * @description
 * # SubscriptionofferCtrl
 * Controller of the yoAngularifyApp
 */

define(['app', 'angular', 'addCard'], function (app, angular) {
    app.controller('SubscriptionofferCtrl', ["$scope", 'subscriptionOfferStrings', 'billingApi', '$location', 'addCardService', '$q', '$timeout', 'analytics',
        function ($scope, subscriptionOfferStrings, billingApi, $location, addCardService, $q, $timeout, analytics) {
            $scope.title = "Subscriptionoffer page";
            console.log('insid suscription offer');
            // init
            $scope.money = function (money) {
                return "£" + new Number(money).toFixed(2);
            };  //TODO: this could be a factory somewhere
            $scope.selectedPlan = -1;
            $scope.freePlanIdx = -1;
            $scope.strings = subscriptionOfferStrings;
            $scope.shouldRequestCardDetails = shouldRequestCardDetails;
            $scope.changeCard = false;
            $scope.buy = buy;
            $scope.isPlanDisabled = isPlanDisabled;
            $scope.nothingToBePaid = nothingToBePaid;
            $q.all([
                attachPlansToScope(),
                attachBillingStatusToScope()
            ]).then(function () {
                $timeout(function () {
                    selectDefaultPlan();
                }, 0);
            });
            registerListenerForPaymentDetailsChange();
            analytics.newPage("subscriptionOffer");
            //
            function attachPlansToScope() {
                return billingApi.getPlans()
                    .then(function (plans) {
                        $scope.plans = plans;
                        $scope.plans.forEach(function (pl) {
                            pl.periodicity = subscriptionOfferStrings.periodicity(pl.billingCycle);
                            if (pl.billingCycle === 'ANNUAL') { //Hard-coded for now
                                pl.bestValue = true;
                                pl.discount = "FOUR_MONTHS_FREE";
                            }
                        });
                        $scope.plans.sort(sortPlansByAscendingCycleDuration);
                    });
            }

            function sortPlansByAscendingCycleDuration(p1, p2) {
                return (getPlanCycleDurationInMonths(p1) - getPlanCycleDurationInMonths(p2));
            }

            function getPlanCycleDurationInMonths(pl) {
                switch (pl.billingCycle) {
                    case 'BIENNIAL':
                        return 24;
                    case 'ANNUAL':
                        return 12;
                    case 'BIANNUAL':
                        return 6;
                    case 'MONTHLY':
                        return 1;
                }
                return 0;
            }

            function attachBillingStatusToScope() {
                return billingApi.getBillingStatus()
                    .then(function (status) {
                        $scope.billingStatus = status;
                        $scope.isVoucherApplied = (status.vouchers && status.vouchers.length > 0);
                    });
            }

            function selectDefaultPlan() {
                $scope.plans.forEach(function (pl, idx) {
                    if (pl.bestValue) {
                        $scope.selectedPlan = idx;
                    }
                });
                for (var i = 0; i < $scope.plans.length; i++) {
                    if ($scope.plans[i].discountPrice < $scope.plans[i].totalPrice) {
                        $scope.selectedPlan = i;
                        $scope.plans[i].discountDurationInCycles = $scope.billingStatus.vouchers[0].durationInCycles;
                        if ($scope.plans[i].discountPrice === 0) {
                            $scope.freePlanIdx = i;
                        }
                        break;
                    }
                }
            }

            function nothingToBePaid() {
                return $scope.freePlanIdx !== -1;
            }

            function isPlanDisabled(idx) {
                return $scope.freePlanIdx !== -1 && $scope.freePlanIdx !== idx;
            }

            function shouldRequestCardDetails() {
                return $scope.changeCard || !($scope.billingStatus && ($scope.billingStatus.paymentCardNumber != null));
            }

            function buy() {
                console.log('called buy function');
                var selectedPlanIdx = parseFloat($scope.selectedPlan),
                    planToBuy = $scope.plans[selectedPlanIdx];
                billingApi.updateBillingCycle(planToBuy.billingCycle)
                    .then(function () {
                        analytics.sendEvent({
                            type: 'cardDetailsEntered',
                            eventData: {subscriptionPlan: planToBuy.billingCycle}
                        });
                        navigateToSubscriptionStatus();
                    });
            }

            function paymentFailed() {
                $location.path("/cardRejection");
            }

            function navigateToSubscriptionStatus() {
                if ($scope.signupJourney) {
                    $location.path("/signup/subscriptionstatus").search({justSubscribed: true});
                } else {
                    $location.path("/subscriptionstatus").search({justSubscribed: true});
                }
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
        }]);
    // ...
    //or use angular.module to create a new module
});

