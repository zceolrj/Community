elife.factory('API', ['$rootScope', '$http', '$q', '$cookieStore', function($rootScope, $http, $q, $cookieStore){
  //var baseUrl = 'http://223.223.177.38:8082',
  var baseUrl = 'http://223.223.177.32:8082',
      // baseUrl = 'http://0478fedc.ngrok.io',
      currentUser,
      token,
      c_no = 'AA',
      city = {
        // code: 10020,
        // name: 城市
      },
      api = {
        baseUrl: baseUrl,
      };
  // 全局变量存储
  $rootScope.imgBaseUrl = "http://115.28.109.25/elife/dist";
  $rootScope.baseUrl = baseUrl;

  var ready = $q.defer();

  (function(){
    // 获取ua判断平台
    var ua = window.navigator.userAgent,
        os = (function () {
          if (/(iPhone|iPod|iPad|iOS)/i.test(ua)) {
            return 'ios';
          } else if (/Android/i.test(ua)) {
            return 'android';
          } else {
            return 'other';
          }
        })();
    // 获取令牌
    var t_k = $cookieStore.get('t_k'),
        c_no = 'AA';
    // 设置总体配置对象
    api.elifeConf = {
      // 判断平台
      os : os,
      t_k : t_k,
      c_no : c_no,
      remoteHost : baseUrl
    };

    // 尝试登录
    var loginPromise = request(
      baseUrl + '/OFSTCUST/cuinfo/login.action',
      'post',
      {
        'userId' : '100001',
        'c_no' : 'AA'
      }
    );
    
    loginPromise.then(function(data){
      console.log('登入信息');
      console.log(data);
      token = data.t_k;
      if(!$cookieStore.get('city_code') || !$cookieStore.get('city_name')){
        $cookieStore.put('city_code','110100');
        $cookieStore.put('city_name','北京');
      }
      $cookieStore.put('t_k',data.t_k);
      $cookieStore.put('c_no','AA');
      $cookieStore.put('cn_code','CN');
      $cookieStore.put('country_code','CN');
      $cookieStore.put('longitude', '106.66566666');
      $cookieStore.put('latitude', '39.6656666');
      
      ready.resolve();
    }, function(data){
      console.info('login failed with code:' + data);
      ready.resolve();
    });
  })();

  /*本地数据存储*/
  var Storage = {
    put: function(key, obj){
      var str = JSON.stringify(obj);
      localStorage.setItem(key, str);
    },
    get: function(key){
      var str = localStorage.getItem(key);
      return JSON.parse(str);
    }
  };


  function request(url, method, data, cache){
    cache = cache || true;
    var deferred = $q.defer();
    $http({
      method : method,
      url: url,
      data : data,
      cache : true
    })
    .success(function(result, status) {
      if(result && result.res){
        if(result.res == '0'){
          deferred.resolve(result.data || result);
        }else{
          deferred.reject(result.res, result);
        }
      }
    })
    .error(function(data, status) {
      deferred.reject(status, 'network failed');
    });

    return deferred.promise;
  }


  function requestRaw(url, method, data, cache){
    cache = cache || true;
    var deferred = $q.defer();
    $http({
      method : method,
      url: url,
      data : data,
      cache : true
    })
    .success(function(result, status) {
      if(result && result.res){
        if(result.res == '0'){
          deferred.resolve(result);
        }else{
          deferred.reject(result.res, result);
        }
      }
    })
    .error(function(data, status) {
      deferred.reject(status, 'network failed');
    });

    return deferred.promise;
  }

//返回值没有res=0的情况
  function requestNoRes(url, method, data, cache){
    cache = cache || true;
    var deferred = $q.defer();
    $http({
      method : method,
      url: url,
      data : data,
      cache : true
    })
    .success(function(result, status) {
      if(result){
          deferred.resolve(result);
      }
    })
    .error(function(data, status) {
      deferred.reject(status, 'network failed');
    });

    return deferred.promise;
  }

  api.onLoginReady = function(){
    return ready.promise();
  };
  /* 登录状态验证 */
  api.isLogin = function(){
    return !!token;
  };
  /*获取用户信息*/
  api.getUserInfo = function(){
    var para = {
      't_k' : $cookieStore.get('t_k'),
      'c_no' : $cookieStore.get('c_no')
    };
    var promise = requestNoRes(
      baseUrl+'/OFSTCUST/cuinfo/findCuMoreById.action',
      'post',
      para
    );
    return promise;
  };



/********************首页模块************************
*****************************************************/ 


  /*获取首页banner信息*/
  api.getBannerInfo = function(){
    var para = {
      t_k : $cookieStore.get('t_k'),
      c_no : $cookieStore.get('c_no'),
      city_code : $cookieStore.get('city_code'),
      count : 3
    };
   // console.log( $cookieStore.get('t_k')+$cookieStore.get('c_no')+$cookieStore.get('city_code'));
    var promise = request(
      baseUrl + '/OFSTCUST/banner/bannerInfo.action',
      'post',
      para
    );
    return promise;
  };
  /*首页，行业大类*/
  api.getHomeLargeCategory = function(para){
    para.city_code = para.city_code || $cookieStore.get('city_code');
    var promise = request(
      baseUrl + '/OFSTCUST/industry/findBtn.action',
      'post',
      para
    );
    return promise;
  };

  /*首页，工行服务搜索*/
  api.getHomeGhService = function(para){
    para.city_code = para.city_code || 110100;
    var promise = request(
      baseUrl + '/OFSTCUST/storecredit/getStoreCreditList.action',
      'post',
      para
    );
    return promise;
  };
  /*首页，精选优惠*/
  api.getHomeSpecialOffer = function(para){
    var promise = request(
      baseUrl + '/OFSTCUST/industry/findBtn.action',
      'post',
      para
    );
    return promise;
  };

  /*首页，搜索历史记录*/
  api.getHomeSearchHistory = function(){
    var key = "HOME_SEARCH_HISTORY";
    return Storage.get(key);
  };
  api.addHomeSearchHistory = function(keyword){
    var key = "HOME_SEARCH_HISTORY";
    var historys = Storage.get(key);
    var index = historys.indexOf(keyword);
    if(index != -1){
      historys.splice(index, 1);
      historys.unshift(keyword);
    }else{
      historys.unshift(keyword);
    }
    Storage.put(key, historys);
    return ;
  };
  /*首页，清除历史记录*/
  api.clearHomeSearchHistroy = function(){
    var key = "HOME_SEARCH_HISTORY";
    return Storage.put(key,[]);
  };

  // 搜素热门城市
  api.getHotSearchCity = function(para){
    para.t_k = $cookieStore.get('t_k');
    para.c_no = $cookieStore.get('c_no');
    para.country_code = para.country_code || "CN";
    para.top_count = para.top_count || "6";
    var promise = request(
      baseUrl + '/OFSTCUST/area/hotCity.action',
      'post',
      para
      );
    return promise;
  };


  /*首页，更多精选优惠*/
  api.getMoreSpecialOffer = function(para){
    var promise = request(
      baseUrl + '/OFSTCUST/industry/findBtn.action',
      'post',
      para
    );
    return promise;
  };



  /*首页，推荐商户*/
  api.getHomeRecommandStore = function(para){
    // var promise = request(
    //   baseUrl + '/OFSTCUST/industry/findBtn.action',
    //   'post',
    //   para
    // );
    // return promise;
    para.t_k = $cookieStore.get('t_k');
    para.c_no = $cookieStore.get('c_no');
    para.count = 2;
    para.city_code = $cookieStore.get('city_code');
    var promise = request(
      baseUrl + '/OFSTCUST/storecredit/getRecommendedStore.action',
      'post',
      para
    );
    return promise;
  };

  /*更多推荐商户*/
  api.getMoreRecommandStore = function(para){
    var promise = request(
      baseUrl + '/OFSTCUST/storecredit/getRecommendedStore.action',
      'post',
      para
    );
    return promise;
  };

  /*首页，猜你喜欢*/
  api.getHomeGuessLike = function(para){
    var promise = request(
      baseUrl + '/OFSTCUST/industry/findBtn.action',
      'post',
      para
    );
    return promise;
  };

 /*全部商区和热门商区*/
  api.getAllDistrict = function(para){
    para.city_code =  para.city_code || $cookieStore.get('city_code');
    para.Cn_code = $cookieStore.get('cn_code');
    para.t_k = $cookieStore.get('t_k');
    para.c_no = $cookieStore.get('c_no');
    var promise = requestRaw(
      baseUrl + '/OFSTCUST/businessdistrict/listDistrict.action',
      'post',
      para
    );
    return promise;
 };
 /*附近搜索*/
  api.getNearBySearch = function(para){
    para.city_code = para.city_code || 110100;
    var promise = request(
      baseUrl + '/OFSTCUST/storedetail/getFoodHome.action',
      'post',
      para
    );
    return promise;
  };
  /*根据城市获取行业大类和行业小类*/
  api.getAllType = function(para){
    para.t_k = $cookieStore.get('t_k');
    para.c_no = $cookieStore.get('c_no');
    var promise = request(
      baseUrl + '/OFSTCUST/industry/getAllType.action',
      'post',
      para
    );
    return promise;
  };


 /*逸贷商户筛选*/
  api.getYidaiBySearch = function(para){
    para.city_code = para.city_code || 110100;
    var promise = request(
      baseUrl + '/OFSTCUST/storeisyd/getStoreIsydList.action',
      'post',
      para
    );
    return promise;
  };
  
 /*工行卡优惠筛选*/
  api.getCardOfferBySearch = function(para){
    para.city_code = para.city_code || 110100;
    para.t_k = token;
    para.c_no = c_no;
    var promise = request(
      baseUrl + '/OFSTCUST/iFavorableList/getFavorableList.action',
      'post',
      para
    );
    return promise;
  };




  //获取热门城市
  api.getCity = function(para){
    para.t_k = $cookieStore.get('t_k');
    para.c_no = $cookieStore.get('c_no');
    para.country_code = para.country_code || "CN";
    var promise = request(
      baseUrl + '/OFSTCUST/area/showAlphaCity.action',
      'post',
      para
      );
    return promise;

  };
  //获取城市列表

 /*积分消费商户筛选*/
  api.getJifenBySearch = function(para){
    para.city_code = para.city_code || 110100;
    var promise = request(
      baseUrl + '/OFSTCUST/storeisyd/getStoreIsydList.action',
      'post',
      para
    );
    return promise;
  };

   /*首页顶部-关键词搜索*/
  api.getStore = function(para){
    para.city_code = para.city_code || 110100;
    var promise = request(
      //baseUrl + '/OFSTCUST/storeisyd/getStoreIsydList.action',
      baseUrl + '/OFSTCUST/storequery/list.action',
      'post',
      para
    );
    return promise;
  };

  /*解析商户门店小图标*/
  api.resolveDiscountRole = function(para){
    // 原字符串得各个位，值为1表明相应图标应显示，数量达到3个后直接返回
    var resultValue = new Array(3);
    var resultRole = new Array("yi","shan","ji","fen","gong","tuan","shua","cu","yu");

    var index=0;
    for (var i = 0; i < resultRole.length; i++) {
      // 如果满足要求的图标已经达到3个，直接返回
      if(index > 2){
        return resultValue;
      }
      if(para.charAt(i) == '1'){
        resultValue[i] = " icon_" + resultRole[i];
        index++;
      }
    }
    
    return resultValue;
  };

/********************优惠模块************************
*****************************************************/ 
 // 获取工行卡优惠列表
  api.getICBCDiscountList = function(para){
    para.t_k = $cookieStore.get('t_k');
    para.c_no = $cookieStore.get('c_no');
    var promise = request(
      baseUrl + '/OFSTCUST/iFavorableList/getFavorableList.action',
      'post',
      para
      );
    return promise;
  };





/********************我的模块************************
*****************************************************/ 



 // 获取我的电子券
  api.getECoupon = function(para){
    var promise = request(
      baseUrl + '/OFSTCUST/info/showEleTicket.action',
      'post',
      para
      );
    return promise;
  };


 //修改个人信息
  api.changePersonalInfo = function(para){
    var promise = request(
      baseUrl + '/OFSTCUST/cuinfo/updateCuinfo.action',
      'post',
      para
      );
    return promise;
  };

  return api;
}]);