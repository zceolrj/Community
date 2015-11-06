/**
 * Created by zceolrj on 2015/10/3.
 */
community.controller('restfulCtrl', function($scope, $rootScope, $http){
    $scope.invokeRestful = function(){
        //var url = "http://localhost:8080/greeting4";
        var url = "http://localhost:8080/DocHub/greeting4";
        var data = {
            "id" : 111,
            "content" : "just test json"
        };
        $http({
            method : 'post',
            url: url,
            data : data
        })
        .success(function(response) {
            console.log(response);
            console.log(response.id);
            console.log(response.content);
        })
        .error(function(response) {
            console.log("error:" + response);
        });
    };
});