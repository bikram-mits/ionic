angular.module('starter.services')
    .factory('storeDeviceToken', function($rootScope, $http) {

        return {

            storeToken: function(deviceType, $scope) {

                var user = {

                    userId: $rootScope.user.id,
                    type: deviceType,
                    regId: $scope.regId

                }
                alert('storing....');
                $http.post('http://192.168.0.107:3000/api/device', JSON.stringify(user))
                    .success(function(data, status) {

                        alert('data');
                    })
                    .error(function(data, status) {

                        console.log("Error storing device token");
                    });

            }
        }

    });
