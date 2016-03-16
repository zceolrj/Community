elife.controller('BusinessInfoCtrl', ['$scope' ,'$http', '$cookieStore', '$routeParams', 'SharedState', function($scope,$http, $cookieStore,$routeParams, SharedState){
  $scope.hideCustomersList=true;
  $scope.hideIcbcList=true;
  $scope.checkInfoIcbc="查看更多";
  $scope.checkInfoCustomers="查看更多";
  $scope.id=$routeParams.id;
 document.getElementById("btitle").innerHTML = window.history.length;
 console.log("a"+history.length);

  //收藏需要替换url
 $scope.AddFavor = function (){
  console.log("开始收藏");
  $http.post('http://223.223.177.38:8082/OFSTCUST/cuinfo/findCuMoreById.action ',{
  't_k' : $cookieStore.get('t_k'),
  'c_no' : $cookieStore.get('c_no'),
  'store_code' : $scope.id,
  'city_code' : $cookieStore.get('city_code')
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

  //TODO 商户详情 2015-05-10 12:29:56 
$http.post('http://223.223.177.38:8082/OFSTCUST/cuinfo/findCuMoreById.action ',{
  't_k' : $cookieStore.get('t_k'),
  'c_no' : $cookieStore.get('c_no'),
  'store_code' : $scope.id,
  'city_code' : ''
})
.success(function (data) {
  data={
    "res" : 0,
    "data" :
    {
      "store_code": "102030411111",
      "store_name": "商户名称",
      "image_url": "http://",
      "image_name": "test",
      "address": "海淀区",
      "dcmt_level": "5",
      "distance": "700",
      "small_type": "川菜/家常菜",
      "people_consumption": "200",
      "praise_count":"3",
      "sentiment_count":"2000",
      "view_count":"11111",
      "tel_phone":"010-999999",
      "is_yd":"1",
      "is_fq":"0",
      "is_jf":"1",
      "is_sk":"0",
      "is_gh":"0",
      "is_tu":"0",
      "is_cx":"0",
      "is_ka":"0",
      "is_free":"1",
      "is_wifi":"0",
      "is_credit_card":"1",
      "start_time":"09:00",
      "end_time":"22:00"

    }
  };
    var info = data.data;
    $scope.busiInfo = {
      "store_code" : info.store_code,
      "store_name" : info.store_name,
      "image_url" : info.image_url,
      "image_name" : info.image_name,
      "address" : info.address,
     // "distance" : info.distance / 1000,
     // "small_type" : info.small_type,
      "people_consumption" : info.people_consumption,
      "sentiment_count" : info.sentiment_count,
      "praise_count" : info.praise_count,
      "view_count" : info.view_count,
      "tel_phone" : info.tel_phone,
      "start_time" : info.start_time,
      "end_time" : info.end_time,
      "is_wifi" : info.is_wifi == "0" ? "_gray" : "",
      "is_free" : info.is_free == "0" ? "_gray" : "",
      "is_credit_card" : info.is_credit_card == "0" ? "_gray" : ""
    };
    var icon_flags = [];
    icon_flags[0] = info.is_yd == "0" ? "none" : "yi";
    icon_flags[1] = info.is_fq == "0" ? "none" : "fen";
    icon_flags[2] = info.is_jf == "0" ? "none" : "ji";
    icon_flags[3] = info.is_sk == "0" ? "none" : "shan";
    icon_flags[4] = info.is_gh == "0" ? "none" : "gong";
    icon_flags[5] = info.is_tu == "0" ? "none" : "tuan";
    icon_flags[6] = info.is_cx == "0" ? "none" : "cu";
    icon_flags[7] = info.is_ka == "0" ? "none" : "ka";
    $scope.busiInfo.flags = icon_flags;
    var stars=[];
    for(var j=0;j<5;j++)
      {
        if (j+1<=info.dcmt_level)
        {
          stars[j] = {"type":"full"};
        }else if(j - info.dcmt_level < 0)
        {
          stars[j] = {"type":"half"};
        }else {
          stars[j] = {"type" : "gray"};
        }
      }
    $scope.busiInfo.stars = stars;
    $scope.flags = icon_flags;
    console.log($scope.busiInfo);
  });
$http.post('http://223.223.177.38:8082/OFSTCUST/cuinfo/findCuMoreById.action ',{
  't_k' : $cookieStore.get('t_k'),
  'c_no' : $cookieStore.get('c_no'),
  'store_code' : $scope.id,
}).success(function(data){
  data = {
    "res": "0",
    "data": [
    {
      "pft_code":"11111",
      "image_url": "http://",
      "image_name": "xxx",
      "title": "俏江南望京店",
      "o_price": "150",
      "n_pirce": "99"
    },
    {
      "pft_code":"11111",
      "image_url": "http://",
      "image_name": "xxx",
      "title": "俏江南望京店",
      "o_price": "150",
      "n_pirce": "99",
      "buy_count": "10023"

    },
    {
      "pft_code":"11111",
      "image_url": "http://",
      "image_name": "xxx",
      "title": "代金券",
      "o_price": "150",
      "n_pirce": "99"
    }

    ]
  };
  $scope.discounts = data.data;

});

$scope.otherStores = function(){
  
    $http.post('http://223.223.177.38:8082/OFSTCUST/cuinfo/findCuMoreById.action',{
    't_k' : $cookieStore.get('t_k'),
    'c_no' : $cookieStore.get('c_no'),
    'store_code' : $scope.id,
    'count' : 10//document.getElementById("keyword").value 
  })
    .success(function (data) {
      data = {
        "res": "0",
        "data": [
        {
          "store_code": "102030411111",
          "store_name": "123",
          "level": "1",
          "image_url": "",
          "district_name": "金融街",
          "distance": "100",
          "small_code": "1",
          "promotions_type": "255",
          "is_yd": "1",
          "is_fq": "0",
          "is_jf": "0",
          "is_sk": "0",
          "is_gh": "0",
          "is_tu": "0",
          "is_cx": "0",
          "is_ka": "0"
        },
        {
          "store_code": "102030411111",
          "store_name": "1221213",
          "level": "1.5",
          "image_url": "",
          "district_name": "金融街",
          "distance": "25000",
          "small_code": "22",
          "promotions_type": "127",
          "is_yd": "1",
          "is_fq": "0",
          "is_jf": "0",
          "is_sk": "0",
          "is_gh": "0",
          "is_tu": "0",
          "is_cx": "0",
          "is_ka": "0"
        }
        ]
      };
      var info = data.data;
      for (var i=0;i<info.length;i++)
      {
        var stars=[];
      var icon_flags=[];
      for(var j=0;j<5;j++)
      {
        if (j+1<=info[i].level)
        {
          stars[j] = {"type":"full"};
        }else if(j - info[i].level < 0)
        {
          stars[j] = {"type":"half"};
        }else {
          stars[j] = {"type" : "gray"};
        }
        icon_flags[0] = info[i].is_yd == "0" ? "none" : "yi";
        icon_flags[1] = info[i].is_fq == "0" ? "none" : "fen";
        icon_flags[2] = info[i].is_jf == "0" ? "none" : "ji";
        icon_flags[3] = info[i].is_sk == "0" ? "none" : "shan";
        icon_flags[4] = info[i].is_gh == "0" ? "none" : "gong";
        icon_flags[5] = info[i].is_tu == "0" ? "none" : "tuan";
        icon_flags[6] = info[i].is_cx == "0" ? "none" : "cu";
        icon_flags[7] = info[i].is_ka == "0" ? "none" : "ka";
      }
      info[i].stars = stars;
      info[i].flags = icon_flags;
      info[i].price = info[i].promotions_type;
      }

      console.log(info);
      $scope.otherStores = info;
    });

};
$scope.otherStores();

$scope.getBusiDetail = function(store_code){
  $http.post('http://223.223.177.38:8082/OFSTCUST/cuinfo/findCuMoreById.action',{
    't_k' : $cookieStore.get('t_k'),
    'c_no' : $cookieStore.get('c_no'),
    'store_code' : $scope.id,
  }).success(function(date){
    data = {
      "res": "0",
      "data": {
        "store_code": "102030411111",
        "store_info": "商户简介信息.......",
        "store_ts": "商户特色......",
        "start_time": "07:00",
        "end_time": "23:00"
      }
    };
    var info = data.data;
    console.log(info);
    $scope.busiDetail = info;
  });
};

//商户关闭和重复报错
$scope.errorReport = function(type){
  //TODO
};

}]);

