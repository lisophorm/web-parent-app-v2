/**
 * @ngdoc service
 * @name yoAngularifyApp.addCardService
 * @description
 * # addCardService
 * Factory in the yoAngularifyApp.
 */
define(['app', 'angular'], function (app, angular) {
    app.factory('addCardService', function () {
        // Service logic
        // ...
        console.log('within addCardService');
        // Public API here
        return {
            setPaymentDetailsChangedListener: function (newListener) {
                if (!(newListener &&
                    newListener.paymentDetailsChanged &&
                    typeof newListener.paymentDetailsChanged === 'function' &&
                    typeof newListener.paymentDetailsChangeFailed === 'function')) {
                    console.log("Listener passed to setPaymentDetailsChangedListener does not declare " +
                        "a paymentDetailsChanged and a paymentDetailsChangeFailed method", newListener);
                    return;
                }
                paymentDetailsChangedListener = newListener;
            },
            removePaymentDetailsChangedListener: function (listener) {
                if (listener === paymentDetailsChangedListener) {
                    delete(paymentDetailsChangedListener);
                }
            }
        };
    });
    // or use angular.module to create a new module
});
