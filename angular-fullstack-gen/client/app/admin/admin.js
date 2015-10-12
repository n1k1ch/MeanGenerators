'use strict';

angular.module('angularFullstackDemoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl',
        title: 'Admin'
      });
  });
