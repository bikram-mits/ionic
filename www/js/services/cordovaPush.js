angular.module('starter.services')

.factory('cordovaPush', function($cordovaPush, $rootScope, $cordovaToast, deviceReady, storeDeviceToken, $cordovaDialogs, $cordovaMedia, $cordovaPush, $ionicPlatform) {

    return {


        getRegId: function($scope, config) {

            alert(config.senderID);
            $ionicPlatform.ready(function() {

                $cordovaPush.register(config).then(function(result) {
                    $cordovaToast.showShortCenter('Registered for push notification.');

                    if (deviceReady.ios) { // This is only for iso device..-The registration id for id comes in pushNotificationReceived ...

                        $scope.regId = result;
                        storeDeviceToken.storeToken("ios", $scope);


                    }
                }, function(err) {

                    console.log(err);
                });
            });

        }

    }

});
