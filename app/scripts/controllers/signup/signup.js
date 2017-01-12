'use strict';

/**
 * @ngdoc function
 * @name web-parent-app-v2.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the web-parent-app-v2
 */

define(['app', 'angular', 'config'], function (app, angular, config) {
    var signupEndPoint = config.userUrl + '/v2/adult';
    app.controller('SignupCtrl', ["$scope", '$http', '$location', '$q', 'userSession', '$sce', 'loginApi', 'billingApi', '$rootScope', 'analytics', function ($scope, $http, $location, $q, userSession, $sce, loginApi, billingApi, $rootScope, analytics) {
        var account,
            appliedVoucher;

        $scope.title = "Signup page";
        $scope.passwordStage = false;
        console.log('WITHIN SIGNUP');
        if ($location.path() === '/totstoo') {
            $rootScope.totstoo = true;
        }

        $scope.submitEmail = function () {
            $scope.passwordStage = true;
            $scope.errorMsg = "";
        }

        $scope.submitDetails = function () {
            var submitVoucherPromise;
            $scope.errorMsg = "";
            $scope.loading = true;

            if (isAccountCreated()) {
                submitVoucherPromise = submitVoucher();
            } else {
                submitVoucherPromise = createAccount({
                    emailAddress: $scope.userId,
                    password: $scope.password,
                    over18: "true",
                    termsAccepted: "true",
                    source: "parent"
                }).then(function (res) {
                    var data = res.data;
                    if (data.error === true) {
                        $scope.termsAccept = data.termsAccepted;
                        $scope.over18 = data.over18;
                        $scope.errorMsg = "Oops, check your email address and type a valid email address";
                        $scope.passwordStage = false;
                        return $q.reject();
                    }
                    account = data;
                    reportAccountCreation(data);
                    return loginApi.login($scope.userId, $scope.password);
                }).then(function () {
                    $rootScope.userUpdated();
                    return submitVoucher();
                });
            }
            submitVoucherPromise.then(function () {
                if (appliedVoucher && appliedVoucher.organization !== "O2" && appliedVoucher.percentageDiscount !== 100) {
                    navigateToSubscriptionOffer();
                    return;
                }
                navigateToSignupEnd();
            }).catch(
                genericFailure
            );
        }

        function submitVoucher() {
            if ($scope.voucherCode && !$scope.voucherSent) {
                return billingApi.addVoucher($scope.voucherCode)
                    .then(
                        function (voucher) {
                            if (voucher) {
                                analytics.sendEvent({
                                    type: 'voucherCodeEntered',
                                    eventData: {campaign: voucher.campaign}
                                });
                                $scope.voucherSent = true;
                                appliedVoucher = voucher;
                            }
                        },
                        voucherFailure
                    );
            }
            return $q.resolve(true);
        }

        function navigateToSubscriptionOffer() {
            $location.path('/signup/subscriptionOffer');
        }

        function navigateToSignupEnd() {
            $location.path('/signup/end');
        }

        function voucherFailure(err) {
            if (!$scope.errorMsg) {    //Only change the errorMsg if there haven't been any errors up the chain
                if (err) {
                    if (err.status === 409) {
                        $scope.errorMsg = "This voucher has been redeemed already, please try a different one";
                    } else if (err.status === 410) {
                        $scope.errorMsg = "Voucher code or campaign no longer active";
                    } else {
                        $scope.errorMsg = "Sigh...this voucher code doesn't seem to be valid. Please try again or contact your code provider.";
                    }
                }
            }

            $scope.loading = false;
            return $q.reject(err);
        }

        function genericFailure(err) {
            if (!$scope.errorMsg) {    //Only change the errorMsg if there haven't been any errors up the chain
                $scope.errorMsg = "There has been an error while processing your request, please try again";
            }

            $scope.loading = false;
        }

        function createAccount(userCredentials) {
            return $http.post(signupEndPoint, userCredentials)
                .then(function (resp) {
                    userSession.sessionChanged($scope.userId, "", true); //This signs out and changes the user name in the session
                    return resp;
                }, function (err) {
                    console.log("Sign up failed");
                    $scope.passwordStage = false;
                    if (err && err.status === 409) {
                        console.log(err);
                        $scope.errorMsg = "Oops, this email address is already registered." + ' <a ui-sref="login" class="alert-danger">' + "Log in" + '</a>' + " or use another email address.";
                    } else {
                        $scope.errorMsg = "Oops, check your email address and type a valid email address";
                    }
                    return $q.reject(err);
                });
        }

        function isAccountCreated() {
            console.log('checking isaccountcreaded:', account);
            return !!account;
        }

        function reportAccountCreation(user) {
            analytics.signUpUserWithId(user.id);
            analytics.sendEvent({type: 'emailSubmitted'});
            analytics.sendEvent({type: 'accountCreated'});
            if (window.fbq) {
                window.fbq('track', 'Lead');
            }
        }


    }]);
    // ...
    //or use angular.module to create a new module
});

