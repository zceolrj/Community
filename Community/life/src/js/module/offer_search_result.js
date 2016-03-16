elife.controller('OfferSearchResultCtrl',['$scope', 'SharedState', 'API', function($scope, SharedState, API){
  
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

  // $http.post('http://192.168.2.60:8080/',{
  //   't_k' : $cookieStore.get('t_k'),
  //   'c_no' : $cookieStore.get('c_no'),
  //   'city_code' : '',
  //   's_row' : '',
  //   'e_row' : '',
  //   'keyword' : ''
  // })
  // .success(function (data) {
      // if (data.res == "0") {
      //   $scope.offerList = data.data;
      // }
  // });

  $scope.getList = function(){
    para = {};
      $scope.offerList = [
            {
                "store_code": "门店名称",
                "store_name": "",
                "distance": "700",
                "store_list": [
                    {
                        "image_url": "images/restaurant_qjn.jpg",
                        "image_name": "xxx",
                        "title": "俏江南望京店",
                        "o_price": "150",
                        "n_price": "99",
                        "buy_count": "10023"
                    },
                    {
                        "image_url": "images/restaurant_qjn.jpg",
                        "image_name": "xxx",
                        "title": "俏江南望京店",
                        "o_price": "150",
                        "n_price": "99",
                        "buy_count": "10023"
                    },
                    {
                        "image_url": "images/restaurant_qjn.jpg",
                        "image_name": "xxx",
                        "title": "俏江南望京店",
                        "o_price": "150",
                        "n_price": "99",
                        "buy_count": "10023"
                    }
                ]
            },
            {
                "store_code": "门店名称",
                "store_name": "",
                "distance": "700",
                "store_list": [
                    {
                        "image_url": "images/restaurant_qjn.jpg",
                        "image_name": "xxx",
                        "title": "俏江南望京店",
                        "o_price": "150",
                        "n_price": "99",
                        "buy_count": "10023"
                    },
                    {
                        "image_url": "images/restaurant_qjn.jpg",
                        "image_name": "xxx",
                        "title": "俏江南望京店",
                        "o_price": "150",
                        "n_price": "99",
                        "buy_count": "10023"
                    }
                ]
            }
        ];
  };
  // 获取列表
  $scope.getList();

  
  
  
}]);