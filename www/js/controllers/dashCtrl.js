angular.module('starter.controllers')

.controller('DashCtrl', function($scope, deviceReady, $ionicPlatform, cordovaPush, $rootScope, sendService, deviceRequest, socket) {

    $rootScope.user = {};

    $scope.chat = {};

    $scope.messages = [];

    $rootScope.user.id = "Bikram";

    $scope.register = function() {

        var config = null;

        if (deviceReady.android || deviceReady.ios) {
            var config = deviceReady.config();
            cordovaPush.getRegId($scope, config);

        } else {

            console.log("Nothing going to happen.........");
        }


    };

    $ionicPlatform.ready(function() {

        $scope.register();
    })


    $scope.sendPushNotification = function() {

        sendService.send();

    }
    $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {

        deviceRequest.callback(notification, $scope);
    });
    $scope.sendMessage = function(text) {

        socket.emit('send:message', {
            "msg": text
        });
        $scope.chat = {};
    }
    socket.on('outgoing:message', function(data) {

        $scope.messages.push(data);
    })

})
