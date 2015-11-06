/**
 * Created by zceolrj on 2015/9/27.
 */
var community = angular.module('community', [
    'ui.router'
])
.config(function($stateProvider, $urlRouterProvider){

    // For any unmatched url, redirect to /state1
    //$urlRouterProvider.otherwise('/state1');

    // Now set up the states
    $stateProvider
        .state('state1', {
            url: '/state1',
            templateUrl: 'view/home/state1.html',
            controller: 'state1Ctrl'
        })
        .state('state1.list', {
            url: '/list',
            templateUrl: 'view/home/state1.list.html',
            controller: 'state1ListCtrl'
        })
        .state('state2', {
            url: '/state2',
            templateUrl: 'view/home/state2.html',
            controller: 'state2Ctrl'
        })
        .state('state2.list', {
            url: '/list',
            templateUrl: 'view/home/state2.list.html',
            controller: 'state2ListCtrl'
        })
        .state('state3', {
            url: '/state3',
            templateUrl: 'view/home/state3.html',
            controller: 'state3Ctrl'
        })
        .state('state3.route1', {
            url: '/route1',
            views: {
                "viewA": {
                    templateUrl: 'view/home/state3.route1.viewA.html',
                    controller: 'state3Route1ViewACtrl'
                },
                "viewB": {
                    templateUrl: 'view/home/state3.route1.viewB.html',
                    controller: 'state3Route1ViewBCtrl'
                }
            }
        })
        .state('state3.route2', {
            url: '/route2',
            views: {
                "viewA": {
                    templateUrl: 'view/home/state3.route2.viewA.html',
                    controller: 'state3Route2ViewACtrl'
                },
                "viewB": {
                    templateUrl: 'view/home/state3.route2.viewB.html',
                    controller: 'state3Route2ViewBCtrl'
                }
            }
        })
        .state('restful', {
            url: '/restful',
            templateUrl: 'view/home/restful.html',
            controller: 'restfulCtrl'
        })
        .state('rest', {
            url: '/test',
            templateUrl: 'view/home/test.html',
            controller: 'testCtrl'
        });


});;/**
 * Created by zceolrj on 2015/9/27.
 */
;/**
 * Created by zceolrj on 2015/10/1.
 */
community.controller('IndexCtrl', function($scope, $rootScope){

});;/**
 * Created by zceolrj on 2015/10/3.
 */
community.controller('restfulCtrl', function($scope, $rootScope, $http){
    $scope.invokeRestful = function(){
        //var url = "http://localhost:8080/greeting4";
        var url = "http://localhost:8080/DocHub/greeting4";
        var data = {
            "id" : 111,
            "content" : "just test json"
        };
        $http({
            method : 'post',
            url: url,
            data : data
        })
        .success(function(response) {
            console.log(response);
            console.log(response.id);
            console.log(response.content);
        })
        .error(function(response) {
            console.log("error:" + response);
        });
    };
});;/**
 * Created by zceolrj on 2015/10/1.
 */
community.controller('state1Ctrl', function($scope, $rootScope){

});;/**
 * Created by zceolrj on 2015/10/1.
 */
community.controller('state1ListCtrl', function($scope, $rootScope){
    $scope.items = ["A", "List", "Of", "Items"];
});;/**
 * Created by zceolrj on 2015/10/1.
 */
community.controller('state2Ctrl', function($scope, $rootScope){

});;/**
 * Created by zceolrj on 2015/10/1.
 */
community.controller('state2ListCtrl', function($scope, $rootScope){
    $scope.things= ["A", "Set", "Of", "Things"];
});;/**
 * Created by zceolrj on 2015/10/3.
 */
community.controller('state3Ctrl', function($scope, $rootScope){

});;/**
 * Created by zceolrj on 2015/10/3.
 */
community.controller('state3Route1ViewACtrl', function($scope, $rootScope){

});;/**
 * Created by zceolrj on 2015/10/3.
 */
community.controller('state3Route1ViewBCtrl', function($scope, $rootScope){

});;/**
 * Created by zceolrj on 2015/10/3.
 */
community.controller('state3Route2ViewACtrl', function($scope, $rootScope){

});;/**
 * Created by zceolrj on 2015/10/3.
 */
community.controller('state3Route2ViewBCtrl', function($scope, $rootScope){

});;/**
 * Created by zceolrj on 2015/10/17.
 */
community.controller('testCtrl', function($scope, $location, $anchorScroll){
    $scope.scroll = function(blockid){
        $location.hash(blockid);
        $anchorScroll();
    };
});