elife.controller('HomeCategoriesCtrl', ['$scope','$http', '$rootScope', '$cookieStore', 'API', function ($scope, $http, $rootScope, $cookieStore, API) {
  $scope.showList=[];

 
   API.getAllType({
    
  }).then(function(data){
     
     $scope.categoryInfo = data;
     console.log('全部类别');
     console.log($scope.categoryInfo);
      $scope.list1 = $scope.categoryInfo[0].small_industry_list;
  }, function(data){
    console.error("全部分类获取失败：" + data);
  });



  // $http.post('http://223.223.177.38:8082/OFSTCUST/industry/getAllType.action',{
  //   't_k' : $cookieStore.get('t_k'),
  //   'c_no' : $cookieStore.get('c_no')
  // }).success(function (data) {
  //     if (data.res == "0") {
  //     $scope.categoryInfo = data.data;
  //     console.log($scope.categoryInfo);
  //     $scope.list1 =  $scope.categoryInfo[0].small_industry_list;
  //     console.log($scope.list1);
  //     }
  // });

for(i=0; i<5; i++){
  $scope.showList[i]=false;
}

//商户信息报错中选择商户类型
$scope.setErrorType = function(small_code, small_name){
  $rootScope.small_code = small_code;
  $rootScope.small_name = small_name;
  history.back();
};


}]);