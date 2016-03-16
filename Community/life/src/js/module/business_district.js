elife.controller('BusinessDistrictInfoCtrl',['$scope', '$http', '$cookieStore', 'API', function($scope, $http, $cookieStore, API){
  $scope.showItem0 = false;
  $scope.showItem1 = false;
  $scope.subDistrictArray = "";


  API.getAllDistrict({
    
  }).then(function(data){
    $scope.districtInfo = data.data;
    console.log("全部商区");
     console.log($scope.districtInfo);
    $scope.topDistrict = data.top_list;
   
  }, function(data){
    console.error("商区获取失败：" + data);
  });

  //   // 获取全部商区
  // $http.post('http://223.223.177.38:8082/OFSTCUST/businessdistrict/listDistrict.action',{
  //   't_k' : $cookieStore.get('t_k'),
  //   'c_no' : $cookieStore.get('c_no'),
  //   'Cn_code' : $cookieStore.get('cn_code'),
  //   'city_code' :  $cookieStore.get('city_code')
  // }).success(function (data) {
  //   console.log(data);
  //   console.log($cookieStore.get('cn_code'));
  //   console.log($cookieStore.get('city_name'));
  //   if (data.res == "0") {
  //    $scope.districtInfo = data.data;
  //    console.log($scope.districtInfo);
  //    $scope.topDistrict = data.top_list;
  //   }
  // });
}]);