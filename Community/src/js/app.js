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


});