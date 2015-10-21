'use strict';

angular.module('angularFullstackDemoApp')
  .controller('InterviewProcessCtrl', function ($scope, $http, $stateParams) {
    $scope.interview = {};
    $scope.answers = [];
    $scope.current = null;

    $http.get('/api/interviews/' + $stateParams.id)
      .then(function (response) {
        $scope.interview = response.data;
      }, function (err) {
        console.log(err);
      });

    $http.get('/api/answers/for/interview/' + $stateParams.id)
      .then(function (response) {
        $scope.answers = response.data;
        console.log($scope.answers);

        angular.forEach($scope.answers, function (el) {
          el.given = false;
        });
      }, function (err) {
        console.log(err);
      });

    function startAnswer(answer) {
      $scope.current = answer;
      $scope.current.rate = $scope.current.rate || 0;
      $scope.current.startedAt = new Date();
    }

    function findNextQuestion(index) {
      for (var i = index; i < $scope.answers.length; i++) {
        var possibleNextAnswer = $scope.answers[i];

        if (!possibleNextAnswer.given) {
          return possibleNextAnswer;
        }
      }

      return null;
    }

    function finishInterview() {
      $scope.interview.finishedAt = new Date();
      console.log($scope.answers);
      console.log($scope.interview);
      $http.put('/api/interviews/finish/' + $scope.interview._id, {
        interview: $scope.interview,
        answers: $scope.answers
      })
        .then(function (response) {
          console.log(response.data);
        }, function (err) {
          console.log(err);
        });
    }

    $scope.start = function () {
      $scope.interview.startedAt = $scope.interview.startedAt || new Date();
      var question = findNextQuestion(0);

      if(question) {
        startAnswer(question);
      }
    };


    $scope.giveAnswer = function () {
      var index = $scope.answers.indexOf($scope.current);
      $scope.current.given = true;
      $scope.current.finishedAt = new Date();
      index++;
      $scope.current = findNextQuestion(index);

      if (!$scope.current) {
        //finish
        var allOver = true;

        angular.forEach($scope.answers, function (e) {
          if (e.given === false) {
            allOver = false;
          }
        });

        if (allOver) {
          finishInterview();
        }
      } else {
        startAnswer($scope.current);
      }
    };

    $scope.isLastAnswer = function () {
      return $scope.answers.indexOf($scope.current) === $scope.answers.length;
    };

    $scope.startAnswer2 = function (answer) {
      console.log('start answer 2');
      if ($scope.interview.startedAt === undefined) {
        $scope.interview.startedAt = new Date();
      }

      $scope.current = answer;
      $scope.current.rate = $scope.current.rate || 0;
      $scope.current.startedAt = new Date();
      $scope.current.startedManually = true;
    };

    $scope.giveAnswer2 = function () {
      $scope.current.given = true;
      $scope.current.finishedAt = new Date();
      $scope.current = null;

      if(!findNextQuestion(0)) {
        finishInterview();
      }
    };
  })

  .directive('labelRating', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.addClass('label');

        var stopObserve = attrs.$observe('labelRating', function (interpolatedValue) {
          element.html(interpolatedValue);

          if (interpolatedValue <= 3) {
            element.removeClass('label-warning label-success').addClass('label-danger');
          } else if (interpolatedValue >= 4 && interpolatedValue < 8) {
            element.removeClass('label-danger label-success').addClass('label-warning');
          } else {
            element.removeClass('label-danger label-warning').addClass('label-success');
          }
        });

        scope.$on('$destroy', function () {
          stopObserve();
        });
      }
    };
  });
