// Ionic Starter App

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCookies'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.Keyboard) {
        window.Keyboard.hideKeyboardAccessoryBar(true);
      }

      if (window.StatusBar) {
        // Set the statusbar to use the default style, tweak this to
        // remove the status bar on iOS or change it to use white instead of dark colors.
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      .state('tab.weather', {
        url: '/weather',
        views: {
          'tab-weather': {
            templateUrl: 'templates/tab-weathers.html',
            controller: 'WeatherCtrl'
          }
        }
      })

      .state('tab.weather-detail', {
        url: '/weather-detail',
        views: {
          'tab-weather': {
            templateUrl: 'templates/weather-detail.html',
            controller: 'WeatherDetailCtrl'
          }
        }
      })

      .state('tab.places', {
        url: '/places',
        views: {
          'tab-places': {
            templateUrl: 'templates/tab-places.html',
            controller: 'PlacesCtrl'
          }
        }
      })

      .state('tab.settings', {
        url: '/settings',
        views: {
          'tab-settings': {
            templateUrl: 'templates/tab-settings.html',
            controller: 'SettingsCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/weather');

  });
