// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'firebase'])

.factory("FirebaseDb", function($firebaseArray, $firebaseObject) {

    return {
        all: function(section) {
            var ref = new Firebase("https://extrareversi.firebaseio.com/" + section);
            var data = $firebaseArray(ref);
            console.log(data);
            return data;
        },

        get: function(section, id) {
            var ref = new Firebase("https://extrareversi.firebaseio.com");
            var data = $firebaseObject(ref.child(section).child(id));
            return data;
        },

        save: function(section, item) {
            var ref = new Firebase("https://extrareversi.firebaseio.com/" + section);

            if (item.$id == undefined) {
                itemsList = $firebaseArray(ref);
                itemsList.$add(item);
            } else {
                var id = item.$id;
                delete item.$$hashKey;
                delete item.$$conf;
                delete item.$id;
                delete item.$priority;
                var newItem = angular.copy(item);
                return ref.child(id).set(newItem);
            }
        },

    };
})


.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html',
                controller: 'SearchCtrl'
            }
        }
    })

    .state('app.joblist', {
        url: '/joblist/:filter',
        views: {
            'menuContent': {
                templateUrl: 'templates/joblist.html',
                controller: 'JobsCtrl'
            }
        }
    })

    .state('app.savedJobs', {
        url: '/savedJobs?savedJobs:1',
        views: {
            'menuContent': {
                templateUrl: 'templates/savedJobs.html',
                controller: 'JobsCtrl'
            }
        }
    })

    .state('app.jobDetail', {
        url: '/jobDetail/:jobId',
        views: {
            'menuContent': {
                templateUrl: 'templates/jobDetail.html',
                controller: 'JobDetailCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/search');
});