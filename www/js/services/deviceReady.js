angular.module('starter.services')

.factory('deviceReady', function($q, applicationId) {

    var ready = $q.defer();


    return {

        ready : ready.promise,

        senderId : applicationId.senderId,

        android : ionic.Platform.isAndroid(),

        ios : ionic.Platform.isIOS(),

        web : ionic.Platform.platform(),

        test : applicationId.senderId,

        config : function(device) {

            var config = {};

            var platform = ionic.Platform.platform();

            switch (platform) {

                case "android":
                    config.senderID = applicationId.senderId;
                    break;

                case "ios":
                    config.badge = true;
                    config.sound = true;
                    config.alert = true;
                    break;

            }
            return config;


        }

    }

});
