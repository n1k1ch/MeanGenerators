'use strict';

angular.module('angularFullstackDemoApp')
  .controller('AddQuestionsCtrl', function ($scope, $state, $stateParams, $http, socket) {
    $scope.id = $stateParams.interviewId;
    $scope.interview = {};
    $scope.allQuestions = [];
    $scope.answers = [];

    $http.get('/api/interviews/' + $scope.id)
      .then(function(response) {
        $scope.interview = response.data;
      }, function(err) {
        console.log(err);
      });

    $http.get('/api/questions')
      .then(function(response) {
        $scope.allQuestions = response.data;

        angular.forEach($scope.allQuestions, function(el) {
          el.added = false;
        });

        $http.get('/api/answers/for/interview/' + $stateParams.interviewId).then(function (response) {
          $scope.answers = response.data;

          angular.forEach($scope.answers, function(answer) {
            angular.forEach($scope.allQuestions, function(question) {
              if (answer.question._id === question._id) {
                question.added = true;
              }
            });
          });
        }, function (err) {
          console.log(err);
        });

        socket.syncUpdates('question', $scope.allQuestions);
      }, function(err) {
        console.log(err);
      });

    $scope.add = function(question) {
      $http.post('/api/answers/' + $scope.interview._id + '/' + question._id, $scope.interview)
        .then(function(response) {
          question.added = true;
          $scope.answers.push(response.data);
        }, function(err) {
          console.log(err);
        });
    };

    $scope.delete = function(answer) {
      $http.delete('/api/answers/' + answer._id)
        .then(function(response) {/*jshint unused:false*/
          angular.forEach($scope.allQuestions, function (question) {
            if(question._id === answer.question._id) {
              question.added = false;
            }
          });

          var index = $scope.answers.indexOf(answer);
          $scope.answers.splice(index, 1);
        }, function(err) {
          console.log(err);
        });
    };
  });
