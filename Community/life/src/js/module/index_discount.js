elife.controller('IndexDiscountCtrl', ['$scope' ,'$http', '$cookieStore', '$routeParams', 'API',function ($scope,$http, $cookieStore,$routeParams, API) {
  // 弹窗交互数据

  // var aa = prompt('close');
  // document.getElementById("aa").innerHTML = aa;
  // if(aa=="closeIcon"){
  //   document.getElementById("foot").style.display = "none";
  //   document.getElementById("close_icon").style.display = "none";
  // }

// 获取工行卡优惠情况
  API.getICBCDiscountList({
    s_row : 1,
    e_row : 3

  }).then(function(data){
     
      console.log("工行卡列表");
      console.log(data);
      $scope.cardOfferList = data;
    }, function(data){
      console.error("列表获取失败：" + data);
    });




     
//app交互判断是不是e生活的客户端
    if(ICBCUtil.isElife()){
      document.getElementById("foot").style.display = "none";
      document.getElementById("close_icon").style.display = "none";
      document.getElementById("aa").innerHTML = aa;
    }

 


  $scope.addBusinessFavor = function(){
    console.log("收藏商户");
    $http.post('http://192.168.2.60:8080/OFSTCUST/cuinfo/findCuMoreById.action ',{
  't_k' : $cookieStore.get('t_k'),
  'c_no' : $cookieStore.get('c_no'),
  's_code' : '11',
  'pft_code' : $cookieStore.get('city_code')
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
  // 收藏银行
  $scope.addBankFavor = function(){
    console.log("收藏银行");
    $http.post('http://192.168.2.60:8080/OFSTCUST/cuinfo/findCuMoreById.action ',{
  't_k' : $cookieStore.get('t_k'),
  'c_no' : $cookieStore.get('c_no'),
  'b_code' : '11',
  
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