'use strict';

angular.module('angularFullstackDemoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('interviewProcess', {
        url: '/interviewProcess/:id',
        templateUrl: 'app/interviewProcess/interviewProcess.html',
        controller: 'InterviewProcessCtrl',
        title: 'Interview Process'
      });
  });
