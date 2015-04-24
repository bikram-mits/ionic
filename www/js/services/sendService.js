angular.module('starter.services')

.factory('sendService',function($rootScope,$http){

   return {

       send :  function(){


          $http.get('http://192.168.0.107:3000/api/device/'+$rootScope.user.id+'').success(function(data,status){


          }).error(function(data,status){

             console.log(data);

          });
       }

   }

});
