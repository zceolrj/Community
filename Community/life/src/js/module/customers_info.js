// 团购详情，团购添加页面js
elife.controller('CustomersInfoCtrl', ['$scope','SharedState', '$http', '$cookieStore', '$routeParams',function($scope, SharedState, $http, $cookieStore,$routeParams){
  $scope.num=1;
  $scope.price=85;

 
 // 选择器方法
 $scope.Minus= function(){
    if($scope.num>=2){
       $scope.num=  $scope.num-1;
        
    }
  
  };
  $scope.Plus= function(){
    if($scope.num<=99){
       $scope.num = $scope.num+1;
      
    }
   
  };
  $scope.Total= function(){
    if(isNaN($scope.num)){
      return 0;
    }
    else{
         $scope.total = ($scope.num*$scope.price).toString();
         $scope.total =  "￥"+$scope.total +".00";
        return $scope.total;
    }
  };
   $scope.default= function(event){
    if(isNaN($scope.num)){
      $scope.num = 1;
    }
    event.target.value = $scope.num;
  };


  $scope.submitOrder= function(){
   if($scope.num === 1){
     location.href="#/discount/customers_succeeded";

   }
   else{
      SharedState.turnOn('submit_order_error_modal');
   }
  };
   // 收藏团购
    $scope.addCustomerFavor = function(){
    console.log("收藏团购");
    $http.post('http://223.223.177.38:8082/OFSTCUST/cuinfo/findCuMoreById.action ',{
  't_k' : $cookieStore.get('t_k'),
  'c_no' : $cookieStore.get('c_no'),
  't_code' : '11'
  })
  .success(function (data) {
    if(data.res === 0){
      console.log("成功");
    }
    if(data.res === 1000002){
      console.log("失败");
    }
    if(data.res === 1000003){
      console.log("缺少参数");
    }

  });
  };
}]);