elife.controller('businessRecommendCtrl',['$scope', 'SharedState', 'API', function($scope, SharedState, API){
  // //列表排序选项开关
  // $scope.filterToggle = function(n){
  //   if(n ===0){
  //     SharedState.turnOff('listFilter');
  //   }else{
  //     var index = SharedState.get('listFilterIndex') || 0;
  //     if(n === index){
  //       SharedState.toggle('listFilter');
  //     }else{
  //       SharedState.set({listFilterIndex:n});
  //       SharedState.turnOn('listFilter');
  //     }
  //   }
  
    
  // };

  API.getMoreRecommandStore({
    count: 20
  }).then(function(data){
    $scope.storeList = data;
  }, function(data){
    console.error("推荐商户页面获取失败：" + data);
  });

   // 更多推荐商户
  // API.getMoreRecommandStore({
  //   count: 20 
  // }).then(function(data){
  //   $scope.storeList = data;
  // }, function(data){
  //   $scope.storeList = [
  //     {
  //       "cis_num": "102030411111",
  //       "mer_name": "商户名称",
  //       "image_url": "images/restaurant_qjn.jpg",
  //       "address": "海淀区",
  //       "dcmt_level": "4",
  //       "distance":"700",
  //       "small_type": "川菜/家常菜",
  //       "price": "200",
  //       "isflag": true
  //     },
  //     {
  //       "cis_num": "102030411111",
  //       "mer_name": "商户名称",
  //       "image_url": "images/restaurant_qjn.jpg",
  //       "address": "海淀区",
  //       "dcmt_level": "5",
  //       "distance":"700",
  //       "small_type": "川菜/家常菜",
  //       "price": "200",
  //       "isflag": false
  //     }
  //   ];
  // });

  
  
}]);