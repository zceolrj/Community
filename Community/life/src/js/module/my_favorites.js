elife.controller('MyFavoritesCtrl',['$scope', '$http', '$cookieStore', 'SharedState', function($scope,$http, $cookieStore, SharedState){
  //是否点击顶部商户删除
  $scope.favor_delete = false;
  $scope.discount_delete = false;

  //商户选择
  $scope.favor_select = [];
  //优惠选择
  $scope.discount_select = [];

  //是否点击底部删除按钮
  $scope.delete_btn = false;

  $scope.showDelete = true;


  for(i=0;i<5;i++){
   $scope.favor_select[i]= false;
   $scope.discount_select[i]= false;
 }
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


   // 按底部删除商户按钮方法
   $scope.openModal = function(){
    if($scope.showDelete){
      if(!angular.element(document.getElementsByClassName("delete_item")).length){
        SharedState.turnOn('favor_del_error_modal');
      }
      else{
        SharedState.turnOn('favor_del_modal');
      }
    }
    else{
      if(!angular.element(document.getElementsByClassName("delete_discount_item")).length){
        SharedState.turnOn('favor_del_error_modal');
      }
      else{
        SharedState.turnOn('favor_del_modal');
      }
    }


  };
  
  //取消按钮
  $scope.deleteFavorCancel = function(){
    $scope.favor_delete = false;
  };

  $scope.deleteDiscountCancel = function(){
    $scope.discount_delete = false;
  };


  // 弹窗删除按钮方法
  $scope.delete= function(){
    if($scope.showDelete){
      angular.element(document.getElementsByClassName("delete_item")).remove();
    }
    else{
      angular.element(document.getElementsByClassName("delete_discount_item")).remove();
    }
  };


  // 按顶部删除商户按钮初始化
  $scope.deleteFavorIni= function(){
   $scope.favor_delete = true;
   for(i=0;i<5;i++){
     $scope.favor_select[i]= false;
   }
 };


    // 按顶部删除优惠按钮初始化
    $scope.deleteDiscountIni= function(){
      $scope.discount_delete = true;
      for(i=0;i<5;i++){
       $scope.discount_select[i]= false;
     }
   };

   $scope.getFavBusiness = function(keyword){
      //2015-05-09
  //TODO 
  // 获取商户收藏
  $http.post('http://223.223.177.38:8082/OFSTCUST/cuinfo/findCuMoreById.action',{
    't_k' : $cookieStore.get('t_k'),
    'c_no' : $cookieStore.get('c_no'),
    'keyword' : keyword
  })
  .success(function (data) {
    data = {
      "res": "0",
      "data": [
      {
        "cis_num": "102030411111",
        "mer_name": "商户名称1",
        "image_url": "images/restaurant_qjn.jpg",
        "address": "海淀区",
        "dcmt_level": "3.5",
        "distance": "700",
        "small_type": "川菜/家常菜",
        "price": "300",
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
        "cis_num": "102030411111",
        "mer_name": "商户名称2",
        "image_url": "images/restaurant_qjn.jpg",
        "address": "海淀区",
        "dcmt_level": "4",
        "distance": "700",
        "small_type": "川菜/家常菜",
        "price": "201",
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
        if (j+1<=info[i].dcmt_level)
        {
          stars[j] = {"type":"full"};
        }else if(j - info[i].dcmt_level < 0)
        {
          stars[j] = {"type":"half"};
        }else {
          stars[j] = {"type" : "gray"};
        }
      }
      icon_flags[0] = info[i].is_yd == "0" ? "none" : "yi";
      icon_flags[1] = info[i].is_fq == "0" ? "none" : "fen";
      icon_flags[2] = info[i].is_jf == "0" ? "none" : "ji";
      icon_flags[3] = info[i].is_sk == "0" ? "none" : "shan";
      icon_flags[4] = info[i].is_gh == "0" ? "none" : "gong";
      icon_flags[5] = info[i].is_tu == "0" ? "none" : "tuan";
      icon_flags[6] = info[i].is_cx == "0" ? "none" : "cu";
      icon_flags[7] = info[i].is_ka == "0" ? "none" : "ka";
      info[i].stars = stars;
      info[i].flags = icon_flags;
    }

    console.log(info);
    $scope.FavBusinesses = info;
  });

};

$scope.getFavBusinessByConditions = function(keyword){
      //2015-05-09
  //TODO 
  // 通过级联条件获取商户收藏
  $http.post('http://223.223.177.38:8082/OFSTCUST/cuinfo/findCuMoreById.action',{
    't_k' : $cookieStore.get('t_k'),
    'c_no' : $cookieStore.get('c_no'),
    'small_code' : '',
    'district_code' : '',
    'sort_code' : ''
  })
  .success(function (data) {
    data = {
      "res": "0",
      "data": [
      {
        "cis_num": "102030411111",
        "mer_name": "商户名称1",
        "image_url": "images/restaurant_qjn.jpg",
        "address": "海淀区",
        "dcmt_level": "3.5",
        "distance": "700",
        "small_type": "川菜/家常菜",
        "price": "300",
        "isflag": "true",
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
        "cis_num": "102030411111",
        "mer_name": "商户名称2",
        "image_url": "images/restaurant_qjn.jpg",
        "address": "海淀区",
        "dcmt_level": "4",
        "distance": "700",
        "small_type": "川菜/家常菜",
        "price": "201",
        "isflag": "false",
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
        if (j+1<=info[i].dcmt_level)
        {
          stars[j] = {"type":"full"};
        }else if(j - info[i].dcmt_level < 0)
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
    }

    console.log(info);
    $scope.FavBusinesses = info;
  });
};

$scope.getFavDiscount = function(keyword){
      //2015-05-10
  //TODO 
  // 获取优惠收藏
  $http.post('http://223.223.177.38:8082/OFSTCUST/cuinfo/findCuMoreById.action',{
    't_k' : $cookieStore.get('t_k'),
    'c_no' : $cookieStore.get('c_no'),
  })
  .success(function (data) {
    data = {
      "res": "0",
      "data": [
      {
        "pft_code":"11111",
        "image_url": "http://",
        "image_name": "图片名称提示",
        "title": "商户优惠标题",
        "o_price": "200",
        "n_pirce": "120"
      },
      {
        "pft_code":"11111",
        "image_url": "http://",
        "image_name": "图片名称提示",
        "title": "商户优惠标题",
        "o_price": "200",
        "n_pirce": "120"
      },
      {
        "pft_code":"11111",
        "image_url": "http://",
        "title": "团购标题",
        "begin_time": "2015-05-05",
        "end_time": "2015-05-08",
        "borwse": "6"
      },
      {
        "pft_code":"11111",
        "image_url": "http://",
        "title": "团购标题",
        "begin_time": "2015-05-05",
        "end_time": "2015-05-08",
        "borwse": "6"
      },
      {
        "pft_code":"11111",
        "image_url": "http://",
        "title": "银行优惠标题",
        "count": "6"
      },
      {
        "pft_code":"11111",
        "image_url": "http://",
        "title": "团购标题",
        "begin_time": "2015-05-05",
        "count": "6"
      }
      ]
    };

    var info = data.data;

    console.log(info);
    $scope.FavDiscounts = info;
  });
};
$scope.getFavBusiness('');


    // if(SharedState.isActive('listFilter')){
    //   angular.element(document.body).addClass('has-modal');
    // }else{
    //   angular.element(document.body).removeClass('has-modal');
    // }
//删除商户收藏   
// $scope.delete = function(){
//   var store_codes = [];
//   //TODO 获取选中的商户
//   for(var i = 0; i < $scope.favor_select.length; i++){
//     if($scope.favor_select[i]){
//       store_codes.push($scope.FavBusinesses[i].cis_num);
//     }
//   }
//   $http.post('http://223.223.177.38:8082/OFSTCUST/cuinfo/findCuMoreById.action',{
//     't_k' : $cookieStore.get('t_k'),
//     'c_no' : $cookieStore.get('c_no'),
//     'store_codes' : store_codes
//   }).success(function(data){
//     window.location.reload();
//   });
//   window.location.reload();
// };


  }]);