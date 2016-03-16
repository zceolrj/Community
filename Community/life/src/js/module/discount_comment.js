elife.controller('DiscountCommentCtrl', ['$scope', function($scope){
  $scope.isTyping = false;
   $scope.globalStar = 0;
   $scope.tasteStar = 0;
   $scope.environmentStar = 0;
   $scope.serviceStar = 0;

   $scope.hideAvg = true;
   // 评价描述
   $scope.des = ['差', '不满意', '一般', '满意', '非常满意'];
 

}]);