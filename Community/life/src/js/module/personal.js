elife.controller('PersonalCtrl', ['$scope', '$http', '$cookieStore', 'API','$rootScope', function ($scope, $http, $cookieStore, API, $rootScope) {
    // 弹窗交互数据
  // var aa = prompt('close');
  // document.getElementById("aa").innerHTML = aa;
  // if(aa=="closeIcon"){
  //   document.getElementById("foot").style.display = "none";
  //   document.getElementById("close_icon").style.display = "none";
  // }

  $scope.check= function(){
    var len  = document.getElementById("trade_return_content").value.length;
   if(len>999){
    $scope.content = $scope.content.substring(0, 999);
   }
  
  };

    API.getHomeLargeCategory({
    e_row: 3
  }).then(function(data){
    console.log("行业大类：");
    console.log(data);
    $scope.largeCategory = data;
  }, function(data){
    $scope.largeCategory = []; 
    console.error("行业大类获取失败：" + data);
    $scope.toast('请检查网络状况');
  });
  

  //获取用户信息
  API.getUserInfo({}).then(function(data){
     var info = data.data;
     console.log("个人信息");
     console.log(info);
     $scope.nickname = info.nickName;
     $scope.img =  $rootScope.imgBaseUrl+info.headuri;

  },function(data){
     console.log("个人信息获取失败");
    $scope.toast("个人信息获取失败，请检查网络状况");
   }
  );

  // 获取我的电子券
  $scope.e_coupon_url = "#/personal/e_coupon";


  // API.getECoupon({
  //   't_k' : $cookieStore.get('t_k'),
  //   'c_no' : $cookieStore.get('c_no')
  // }).then(function(data){
  //    console.log("成功");
  //     console.log(data);
  //     var info = data.data;
  //     if(angular.isUndefined(info)){
  //     $scope.e_coupon_url = "#/personal/e_coupon_blank";
  //   }
  // },function(data){
  //     $scope.toast("电子券获取失败，请检查网络状况");
  //     console.log("获取电子券失败");
  //   });


  $http.post('http://223.223.177.38:8082/OFSTCUST/info/showEleTicket.action',{
    't_k' : $cookieStore.get('t_k'),
    'c_no' : $cookieStore.get('c_no')
  })
  .success(function (data) {
    console.log("我的电子券信息");
    console.log(data);
    var info = data.data;
    if(angular.isUndefined(info)){
      $scope.e_coupon_url = "#/personal/e_coupon_blank";
    }
  });
  
}]);

