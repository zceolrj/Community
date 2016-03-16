elife.controller('ReviewCommentCtrl', ['$scope', function($scope){
  $scope.isTyping = false;
   $scope.globalStar = 0;
   $scope.tasteStar = 0;
   $scope.environmentStar = 0;
   $scope.serviceStar = 0;
   // 评价描述-类型1
   $scope.des = ['差', '不满意', '一般', '满意', '非常满意'];
   // 评价描述-类型2
   $scope.des2 = ['差', '一般', '好', '很好', '非常好'];
}]);