
/**
 * @ngdoc function
 * @name web-parent-app-v2.controller:PasswordresetCtrl
 * @description
 * # PasswordresetCtrl
 * Controller of the web-parent-app-v2
 */
define(['app', 'angular', 'config'], function (app, angular, config) {
    app.controller('ForgottenPasswordResetCtrl', ["$scope", "$stateParams", "$http", "$location", "forgottenPasswordStrings", function ($scope, $stateParams, $http, $location, forgottenPasswordStrings) {
        $scope.title = "Passwordreset page";


        $scope.token = $stateParams.token;
        $scope.strings = forgottenPasswordStrings;

        $scope.showTokenField = true;
        if ($stateParams.token && $stateParams.token.length > 0) {
            $scope.showTokenField = false;
        }
        $scope.submit = function () {
            $http.post(config.authUrl + "/passwordReset",
                {token: $scope.token, newPassword: $scope.pwd})
                .then(resetSuccess, resetSuccess);
        }

        function resetSuccess() {
            $location.url("/login").search('reason', 'loginSuccess');
        }

        function resetFailure(err) {
            $scope.resetError = true;
            if (err.status >= 500 && err.status <= 599) {
                err.status = 500;
            }
            switch (err.status) {
                case 410: {
                    $scope.resetErrorText = "This token has already been used, if you have not reset your password please request a new token.";
                    break;
                }
                case 500: {
                    $scope.resetErrorText = "We seem to be having a few issues at the moment, please try again later - or contact help@azoomee.com";
                    break;
                }
                default: {
                    $scope.resetErrorText = "Something went wrong, please check that your token is correct";
                }
            }

        }

    }]);
    // ...

});

