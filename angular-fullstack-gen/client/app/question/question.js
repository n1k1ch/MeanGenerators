'use strict';

angular.module('angularFullstackDemoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('question', {
        url: '/question',
        templateUrl: 'app/question/question.html',
        controller: 'QuestionCtrl',
        title: 'Questions'
      });
  });
