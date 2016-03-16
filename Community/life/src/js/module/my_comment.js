elife.controller('MyCommentCtrl',['$scope', 'SharedState', function($scope, SharedState){
  $scope.commentList = [
    {
      business: '海底捞',
      star: 4.5,
      time: '2015-03-22',
      content: '不错不错，味道好极了！',
      more: '菜很好吃，服务非常赞。还有双重优惠，非常划算。不过人还是不少，如果没有提前预定，需要排队，建议提前约好时间，预留座。菜很好吃，服务非常赞。其务非常务非常好。'
    },
    {
      business: '海底捞',
      star: 4.5,
      time: '2015-03-22',
      content: '不错不错，味道好极了！'
    },
    {
      business: '海底捞',
      star: 4.5,
      time: '2015-03-22',
      content: '不错不错，味道好极了！'
    },
  ];

  $scope.isEditing =false;
  // 待删除列表
  var deleteList = [];
  $scope.edit = function(){
    if($scope.isEditing){
      $scope.isEditing = false;
      //执行删除操作

    }else{
      $scope.isEditing = true;
      deleteList = [];
    }
  };

  $scope.select = function(comment){
    var index  = deleteList.indexOf(comment);
    if(index === -1){
      deleteList.push(comment);
    }else{
      deleteList.splice(index, 1);
    }
  };

  $scope.isSelect = function(comment){
    var index  = deleteList.indexOf(comment);
    return index != -1;
  };
  $scope.cancel = function(){
    $scope.isEditing = false;
    deleteList = [];
  };

  $scope.preDelete = function(){
    if(deleteList && deleteList.length > 0){
      SharedState.turnOn('comment_del_modal');
    }else{
      SharedState.turnOn('comment_error_modal');
    }
  };
  $scope.delete = function(){
    for(var i=0, n= deleteList.length; i<n; i++){
      var index  = $scope.commentList.indexOf(deleteList[i]);
      if(index != -1){
        $scope.commentList.splice(index, 1);
      }
    }
    $scope.isEditing = false;
  };
  
}]);

elife.controller('MyCommentDetailCtrl',['$scope', 'SharedState', '$routeParams', function($scope, SharedState, $routeParams){
  var id = $routeParams.id;

  var comment = {
    business: '海底捞',
    star: 4.5,
    starEnv: 3,
    starSrvs: 2,
    starTaste: 4,
    time: '2015-03-22',
    content: '不错不错，味道好极了！菜很好吃，服务非常赞。还有双重优惠，非常划算。不过人还是不少，如果没有提前预定，需要排队，建议提前约好时间，预留座。菜很好吃，服务非常赞。其务非常务非常好！'
  };
  $scope.des = ['差', '不满意', '一般', '满意', '非常满意'];

  $scope.comment = comment;
}]);