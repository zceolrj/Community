/**
 * Created by zceolrj on 2015/10/17.
 */
community.controller('testCtrl', function($scope, $location, $anchorScroll){
    $scope.scroll = function(blockid){
        $location.hash(blockid);
        $anchorScroll();
    };
});