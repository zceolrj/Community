elife.controller('BusinessSearchResultCtrl',['$scope', 'SharedState', '$routeParams', '$cookieStore', '$http',  'API', function($scope, SharedState, $routeParams, $cookieStore, $http, API){
  $scope.keyword = $routeParams.keyword || '';
  $scope.currentDistrict = {};
  $scope.currentSmallType = {};
  $scope.loading = true;
  $scope.isEmpty = false;
  //列表排序选项开关
  $scope.sideTab2 = 0;
  $scope.selectType = function(type){
    $scope.currentType = type;
  };

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
    console.log($scope.hotCitys);
    console.log($scope.citys);
    console.log($scope.keyword);
    //修改全部商区的显示 2015-05-15
      var i = $scope.hotCitys.length;
      while(i --){
        if($scope.hotCitys[i].communityName == $scope.keyword){
          $scope.currentDistrict.communityName = $scope.keyword;
        }
      }
      i = $scope.citys.length;
      while(i --){
        if($scope.citys[i].districtName == $scope.keyword){
          $scope.currentDistrict.districtName = $scope.keyword;
        }
      }
  }, function(data){
    console.error("商区获取失败：" + data);
    $scope.toast('请检查网络设置');
  });


  API.getAllType({
    
  }).then(function(data){
    $scope.allTypes = data;
    $scope.currentType = data[0];

    var len = data.length;
    var i = 0;
    while(i<len){
      $scope.small_industry_list = data[i].small_industry_list;
      var j = $scope.small_industry_list.length;
      while(j--){
        if($scope.small_industry_list[j].small_name == $scope.keyword){
          $scope.currentSmallType.small_name = $scope.keyword;
        }
      }
      i++;
    }

  }, function(data){
    console.error("全部分类获取失败：" + data);
  });

  $scope.getList = function(){
    $scope.isEmpty = false;
    $scope.loading = true;
    para = {
      'keyword': $scope.keyword,
      't_k' : $cookieStore.get('t_k'),
      'c_no' : $cookieStore.get('c_no'),
      'city_code' : $cookieStore.get('city_code'),
      'longitude' : $cookieStore.get('longitude'),
      'latitude' : $cookieStore.get('latitude'),
      //'large_code' : $scope.large_code,
      //'small_code' : $scope.small_code,
    };

    API.getStore(para).then(function(data){
      console.log(data);
      $scope.list = data;
      $scope.loading = false;
      if(data === undefined || data.length === 0){
        $scope.isEmpty = true;
      }else{
        $scope.isEmpty = false;
      }
    }, function(data){
      $scope.toast('请检查网络状况');
      $scope.loading = false;
      $scope.isEmpty = true;
    });

    //保存搜索记录
    API.addHomeSearchHistory($scope.keyword);
  


  };
  // 获取列表
  $scope.getList();

  // 测试数据
  // $scope.list =  [
  // {"distance":  "700",
  //   "district_name":  "金融街",
  //   "img_url":  "/OFSTCUST/images/a.jpg",
  //   "large_code": "02",
  //   "level":  "5",
  //   "promotions_title":  "15元超值午餐",
  //   "promotions_type":  "127元/人",
  //   "small_code":  "川菜/家常菜",
  //   "store_code": 111111},
  // {"distance":  "700",
  //   "district_name":  "金融街",
  //   "img_url":  "/OFSTCUST/images/a.jpg",
  //   "large_code": "02",
  //   "level":  "5",
  //   "promotions_title":  "15元超值午餐",
  //   "promotions_type":  "127元/人",
  //   "small_code":  "川菜/家常菜",
  //   "store_code": 111111},
  // {"distance":  "700",
  //   "district_name":  "金融街",
  //   "img_url":  "/OFSTCUST/images/a.jpg",
  //   "large_code": "02",
  //   "level":  "5",
  //   "promotions_title":  "15元超值午餐",
  //   "promotions_type":  "127元/人",
  //   "small_code":  "川菜/家常菜",
  //   "store_code": 111111}
  // ];
  
  
  
}]);