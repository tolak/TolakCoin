var myApp = angular.module('myApp', []);
myApp.controller('PlayTolakCoinController', ['$scope', '$http', function($scope, $http){
    $scope.from = '';
    $scope.to = '';
    $scope.amount = 0;
    $scope.queryUser = '';
    $scope.queryUser_asset = 0;
    $scope.accounts = [];

    $scope.createAccount = function(){
        $http.post('/register', {'accounts': $scope.accounts})
        .success(function(data, status, headers, config) {
            //Sucess
	    $scope.accounts = data.addressList;
        })
        .error(function(data, status, headers, config) {
            alert("Failed to create account!");
        });
    };


    $scope.sendTranscation = function(){
        $http.post('/invoke', {'from': $scope.from, 'to': $scope.to, 'amount': $scope.amount})
        .success(function(data, status, headers, config) {
            //Sucess
            alert("Transcation done!");
        })
        .error(function(data, status, headers, config) {
            alert("Transcation failed!");
        });
    };

    $scope.queryInfo = function(){
        $http.post('/query', {'queryUser': $scope.queryUser})
        .success(function(data, status, headers, config) {
            $scope.queryUser_asset = data.asset;
        })
        .error(function(data, status, headers, config) {
            alert("Query failed!");
        });
    };
}]);
