'use strict';

angular.module('angularFullstackDemoApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .directive('focus', function($timeout) {
    return {
      scope: {
        trigger: '@focus'
      },
      link: function(scope, element) {
        scope.$watch('trigger', function(value) {
          console.log('focus triggered, value: ' + value + ", typeof value " + typeof(value));
          if(value === "true") {
            $timeout(function() {
              element[0].focus();
            })
          }
        });
      }
    };
  })

  //.directive('focusIf', function($timeout) {
  //  function link($scope, $element, $attrs) {
  //    console.log('link focusIf; $element: ' + $element +", $attrs.focusIf: " + $attrs.focusIf );
  //    var dom = $element[0];
  //    if ($attrs.focusIf) {
  //      $scope.$watch($attrs.focusIf, focus);
  //    } else {
  //      focus(true);
  //    }
  //    function focus(condition) {
  //      if (condition) {
  //        $timeout(function() {
  //          dom.focus();
  //        }, $scope.$eval($attrs.focusDelay) || 0);
  //      }
  //    }
  //  }
  //  return {
  //    restrict: 'A',
  //    link: link
  //  };
  //})
  //
  //.directive('selectme', function($timeout) {
  //  return function (scope, element) {
  //    $timeout(function () {
  //      console.log('selectMe' );
  //      var ele = element[0];
  //      ele.focus();
  //      ele.select();
  //    }, 500)
  //  }
  //})

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          event.preventDefault();
          $location.path('/login');
        }
      });
    });
  });
