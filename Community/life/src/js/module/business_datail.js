elife.controller('BusinessDetailCtrl', ['$scope' ,'$http', '$cookieStore', '$routeParams', 'SharedState', function($scope,$http, $cookieStore,$routeParams, SharedState){
  $scope.id=$routeParams.id;

$scope.getBusiDetail = function(store_code){
  $http.post('http://223.223.177.38:8082/OFSTCUST/cuinfo/findCuMoreById.action',{
    't_k' : $cookieStore.get('t_k'),
    'c_no' : $cookieStore.get('c_no'),
    'store_code' : $scope.id,
  }).success(function(date){
    data = {
      "res": "0",
      "data": {
        "store_code": "102030411111",
        "store_info": "商户简介信息.......",
        "store_ts": "商户特色......",
        "start_time": "07:00",
        "end_time": "23:00"
      }
    };
    var info = data.data;
    console.log(info);
    $scope.busiDetail = info;
  });
};
$scope.getBusiDetail($scope.id);

}]);

