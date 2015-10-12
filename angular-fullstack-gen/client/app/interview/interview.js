'use strict';

angular.module('angularFullstackDemoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('interview', {
        url: '/interview',
        templateUrl: 'app/interview/interview.html',
        controller: 'InterviewCtrl',
        title: 'Interviews'
      });
  });
