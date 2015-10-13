'use strict';

angular.module('angularFullstackDemoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('addQuestions', {
        url: '/addQuestions/:interviewId',
        templateUrl: 'app/addQuestions/addQuestions.html',
        controller: 'AddQuestionsCtrl',
        title: 'Add Questions to Interview'
      });
  });
