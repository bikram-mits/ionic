angular.module('starter.services')

.factory('deviceRequest', function($rootScope, $http, $cordovaPush, $cordovaDialogs, $cordovaMedia, storeDeviceToken) {

    return {

        callback: function(notification, $scope) {

            if (deviceReady.android) {


                switch (notification.event) {

                    case "registered":

                        $scope.regId = notification.regid;
                        storeDeviceToken.storeToken("android", $scope);

                        break;

                    case "message":

                        $cordovaDialogs.alert(notification.message, "Push Notification Received.");
                        $scope.$apply(function() {});

                        break;

                    case "error":

                        $cordovaDialogs.alert(notification.msg, "Push notification error.");


                    default:

                        $cordovaDialogs.alert(notification.event, "Something event wrong.");

                }
            } else if (deviceReady.ios) {

                if (notification.foreground == "1") {

                    if (notification.sound) {

                        var mediaSrc = $cordovaMedia.newMedia(notification.sound);
                        mediaSrc.promise.then($cordovaMedia.play(mediaSrc.media));

                    }

                    if (notification.body && notification.messageFrom) {

                        $cordovaDialogs.alert(notification.body, notification.messageFrom);

                    } else {


                        $cordovaDialogs.alert(notification.alert, "Push Notification Received.");
                    }

                    if (notification.badge) {

                        $cordovaPush.setBadgeNumber(notification.badge).then(function(result) {


                        }, function(err) {

                            console.log("Set baged error" + err);
                        })
                    }

                } else {
                    if (notification.body && notification.messageFrom) {
                        $cordovaDialogs.alert(notification.body, "(RECEIVED WHEN APP IN BACKGROUND) " + notification.messageFrom);
                    } else {

                        $cordovaDialogs.alert(notification.alert, "(RECEIVED WHEN APP IN BACKGROUND) Push Notification Received");

                    }
                }


            }
        }


    }

});
