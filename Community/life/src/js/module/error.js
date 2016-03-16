elife.controller('ErrorCtrl', ['$scope', '$routeParams', '$cookieStore' , '$http', function ($scope, $routeParams, $cookieStore, $http) {
    $scope.id = $routeParams.id;
    $scope.errorReport = function(type){
        var data = {
            't_k' : $cookieStore.get('t_k'),
            'c_no' : $cookieStore.get('c_no'),
            'store_code' : $scope.id
        };
        data.type = type;
        if (type == "other"){
            data.is_close = 1;
        } else if (type == "store") {

        } else if (type == "position") {

        } else if (type == "close") {//此处不会出现
            
        }
        $http.post('http://xxxx', data).success(function(){
            console.log("提交成功");
            history.back();
        }); 
        history.back();
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
              "address" : info.address,
              "small_type" : info.small_type,
              "people_consumption" : info.people_consumption,
              "sentiment_count" : info.sentiment_count,
              "praise_count" : info.praise_count,
              "view_count" : info.view_count,
              "tel_phone" : info.tel_phone
 };
 console.log($scope.busiInfo);
});

//商户其他报错
$scope.otherErrorReport = function(type){
  // 跳转到商户首页
  window.location.href="#/business/index/102030411111";  

};

}]);