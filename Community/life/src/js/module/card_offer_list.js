elife.controller('CardOfferListCtrl', ['$scope','SharedState','$http','$cookieStore','API', function ($scope, SharedState,$http,$cookieStore,API){

  // 获取工行卡优惠列表
  // $http.post('http://192.168.2.60:8080/',{
  //   't_k' : $cookieStore.get('t_k'),
  //   'c_no' : $cookieStore.get('c_no'),
  //   'city_code' : '',
  //   's_row' : '',
  //   'e_row' : ''
  // })
  // .success(function (data) {
  //     if (data.res == "0") {
  //       $scope.typeName = data.data.type_name;
  //       $scope.businessList = data.data.merchantsList;
  //     }
  // });

  $scope.typeName = '工行卡优惠';
  // $scope.cardOfferList = [
  //   {
  //       "image_url": "images/restaurant_qjn.jpg",
  //       "title": "工行卡优惠标题",
  //       "begin_time": "2015-05-05",
  //       "count": "6"
  //   },
  //   {
  //       "image_url": "images/restaurant_qjn.jpg",
  //       "title": "工行卡优惠标题",
  //       "begin_time": "2015-05-05",
  //       "count": "6"
  //   }
  // ];


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
  //列表排序选项开关
  $scope.sideTab2 = 0;
  $scope.selectType = function(type){
    $scope.currentType = type;
  };

  $scope.filterByDistrict = function(district){
    $scope.currentDistrict = district;
    $scope.getList();
    $scope.filterToggle(0);
  };

  $scope.filterByType = function(sType){
    $scope.currentSmallType = sType;
    $scope.getList();
    $scope.filterToggle(0);
  };

  API.getAllDistrict({
    
  }).then(function(data){
    $scope.hotCitys = data.top_list;
    $scope.citys = data.data;
  }, function(data){
    console.error("商区获取失败：" + data);
  });

  API.getAllType({
    
  }).then(function(data){
    $scope.allTypes = data;
    $scope.currentType = data[0];
  }, function(data){
    console.error("全部分类获取失败：" + data);
  });

  $scope.getList = function(){
    var para = {};
    if($scope.currentSmallType){
      para.small_code = $scope.currentSmallType.small_code;
    }
    if($scope.currentDistrict){
      para.district_code = $scope.currentDistrict.countryCode || $scope.currentDistrict.districtCode;
    }
     console.log('small_code'+para.small_code+'; district_code'+ para.district_code);
    API.getICBCDiscountList(para).then(function(data){
     
      console.log("工行卡列表");
      console.log(data);
      $scope.cardOfferList = data;
    }, function(data){
      console.error("列表获取失败：" + data);
    });
  };
  // 获取列表
  $scope.getList();

  
}]);