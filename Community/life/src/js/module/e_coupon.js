elife.controller('ECouponCtrl',['$scope', '$http', '$cookieStore', 'SharedState', function ($scope, $http, $cookieStore, SharedState){
  //列表排序选项开关
  $scope.filterToggle = function(n){
    if(n ===0){
      SharedState.turnOff('listFilter');
    }else{
      var index = SharedState.get('listFilterIndex') || 0;
      if(n === index){
        SharedState.toggle('listFilter');
      }else{
        SharedState.set({listFilterIndex:n});
        SharedState.turnOn('listFilter');
      }
    }
  };

  //2015-05-09
  //TODO 
  // 获取我的电子券
  $http.post('http://223.223.177.38:8082/OFSTCUST/info/showEleTicket.action',{
    't_k' : $cookieStore.get('t_k'),
    'c_no' : $cookieStore.get('c_no')
  })
  .success(function (data) {
    console.log(data);
    var info = data.data;
    console.log(info);
    $scope.ECoupons = [];
    for (var i=0; i < info.length; i ++){
      $scope.ECoupons[i] = {
        "Ec_name" : info[i].ec_name,
        "Ec_code" : info[i].ec_code,
        "Effect_beginDate" : info[i].effect_beginDate.substr(0,10),
        "Effect_endDate" : info[i].effect_endDate.substr(0,10),
        "Effect_content" : info[i].effect_content,
        "Effect_state" : info[i].effect_state
      };
    }
  })
  .error(function(data, status) {
      console.error("获取我的电子券失败：" + data);
      $scope.toast('请检查网络状况');
  });


}]);