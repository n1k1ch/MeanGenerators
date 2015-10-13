'use strict';

angular.module('angularFullstackDemoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('interviewReport', {
        url: '/interviewReport/:id',
        templateUrl: 'app/interviewReport/interviewReport.html',
        controller: 'InterviewReportCtrl'
      });
  });
