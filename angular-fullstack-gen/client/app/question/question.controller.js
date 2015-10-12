'use strict';

angular.module('angularFullstackDemoApp')
  .controller('QuestionCtrl', function ($scope, $http, socket) {
    $scope.questions = [];
    $scope.error = '';

    $http.get('/api/questions')
      .success(function(questions) {
        $scope.questions = questions;

        $scope.questions.forEach(function(currVal) {
          currVal.editing = false;
        });

        socket.syncUpdates('question', $scope.questions);
      });

    $scope.createNewQuestion = function() {
      $http.post('/api/questions', {text: $scope.newQuestionText})
        /*.then(function(createdQuestion){
          console.log('new question is ' + createdQuestion);
          $scope.newQuestionText = '';
        })
        .then(function(err) {
          console.log(err);
          $scope.error = err;
        })*/;
      $scope.newQuestionText = '';
    };

    $scope.delete = function(toDelete) {
      $http.delete('/api/questions/' + toDelete._id)
        .then(function(response) {
          console.log(response);
        }, function(err) {
          $scope.error = err;
        });
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('question');
    });

    $scope.edit = function(question) {
      console.log('editing question ' + question);

      $scope.questions.forEach(function(currVal) {
        currVal.editing = false;
      });

      question.editing = true;
    };

    $scope.finishEdit = function(question, isDirty) {
      console.log('finishEdit ' + question.text + ', isDirty: ' + isDirty);
      question.editing = false;

      if(isDirty) {
        $http.put('/api/questions/' + question._id, question)
          .then(function(response) {
            console.log(response);
          })
          .then(function(err) {
            $scope.error = err;
          });
      }
    };
  });
