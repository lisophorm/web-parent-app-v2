/**
 * @ngdoc function
 * @name yoAngularifyApp.controller:AddCardCtrl
 * @description
 * # AddCardCtrl
 * Controller of the yoAngularifyApp
 */
var paymentDetailsChangedListener;


define(['app', 'angular', 'config'], function (app, angular, config) {
    app.controller('AddCardCtrl', ['$scope', 'addCardStrings', 'availableCardTypes', '$sce', 'billingApi', '$timeout', '$document'
        , function ($scope, addCardStrings, availableCardTypes, $sce, billingApi, $timeout, $document) {
            console.log("****** ADDCARD controller");
            $scope.availableCardTypes = availableCardTypes;
            $scope.showIFrame = false;
            //$scope.submitCardType = controller.submitCardType;
            $scope.loading = false;
            $scope.strings = addCardStrings;
            $scope.$watch("selectedCard", cardSelected);
            function cardSelected(newCard, oldCard) {
                console.log("*** watch selectedCard");
                if (newCard === oldCard) {
                    return;
                }
                //controller.setupCallbackMethods();
                var iFrameUrl = config.payment.addCardUrl,
                    appUrl = window.location.href.split('#')[0],
                    appPath = appUrl.substring(0, appUrl.lastIndexOf("/"));
                iFrameUrl += "?Brand=" + newCard;
                iFrameUrl += "&AcceptUrl=" + encodeURIComponent(appPath + '/views/addCard/cardAccepted.html');
                iFrameUrl += "&ExceptionUrl=" + encodeURIComponent(appPath + '/views/addCard/cardRejected.html');
                iFrameUrl = $sce.trustAsResourceUrl(iFrameUrl);
                $scope.iFrameUrl = iFrameUrl;
                $scope.showIFrame = true;
                $timeout(function () {
                    var element = angular.element(document.getElementById('cardOptionsHeader'));
                    $document.scrollToElementAnimated(element, 80, 1000);
                }, 0);
            }
        }]);
    // ...
    //or use angular.module to create a new module
});

