'use strict';

angular.module('angularFullstackDemoApp')
  .controller('InterviewProcessCtrl', function ($scope, $http, $stateParams) {
    $scope.interview = {};
    $scope.answers = [];
    $scope.current = null;

    $http.get('/api/interviews/' + $stateParams.id)
      .then(function(response) {
        $scope.interview = response.data;
      }, function(err) {
        console.log(err);
      });

    $http.get('/api/answers/for/interview/' + $stateParams.id)
      .then(function (response) {
        $scope.answers = response.data;
        console.log($scope.answers);

        angular.forEach($scope.answers, function(el) {
          el.given = false;
        });
      }, function (err) {
        console.log(err);
      });

    $scope.start = function() {
      $scope.interview.startedAt = new Date();
      startAnswer(0);
    };


    $scope.giveAnswer = function() {
      var index = $scope.answers.indexOf($scope.current);
      $scope.current.given = true;
      $scope.current.finishedAt = new Date();
      index++;

      if(index < $scope.answers.length) {
        //go next
        startAnswer(index);
      } else {
        //finish
        $scope.current = null;
        finishInterview();
      }
    };

    $scope.isLastAnswer = function() {
      return $scope.answers.indexOf($scope.current) === $scope.answers.length;
    };

    function startAnswer(index) {
      $scope.current = $scope.answers[index];
      $scope.current.rate =  $scope.current.rate || 0;
      $scope.current.startedAt = new Date();
    }

    function finishInterview() {
      $scope.interview.finishedAt = new Date();
      console.log($scope.answers);
      console.log($scope.interview);
      $http.put('/api/interviews/finish/' + $scope.interview._id, {interview:$scope.interview, answers: $scope.answers})
        .then(function(response) {
          console.log(response.data);
        }, function(err) {
          console.log(err);
        });
    }
  });
