elife.controller('MyCustomersCtrl', ['$scope', function ($scope){
  // 导航栏
  $scope.active = 1;
  //发送团购券check按钮
  $scope.send_check = -1;
   //退款check按钮
  $scope.drawbackCheck=[false,false];
  
  //选择器初始值
  $scope.num = 1;
  $scope.price = 17;

 // 选择器方法
 $scope.Minus= function(){
    if($scope.num>=2){
       $scope.num=  $scope.num-1;
        
    }
  
  };
  $scope.Plus= function(){
    if($scope.num<=99){
       $scope.num=  $scope.num+1;
      
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

  // 自动纠错
  $scope.default= function(event){
    if(isNaN($scope.num)){
      $scope.num = 1;
    }
    event.target.value = $scope.num;
  };
  
}]);