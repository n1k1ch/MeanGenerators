'use strict';

angular.module('angularFullstackDemoApp')
  .controller('InterviewReportCtrl', function ($scope, $http, $stateParams) {
    $scope.interview = {};
    $scope.answers = {};

    $http.get('/api/interviews/' + $stateParams.id)
      .then(function(response) {
        $scope.interview = response.data;
      }, function(err) {
        console.log(err);
      });

    $http.get('/api/answers/for/interview/' + $stateParams.id)
      .then(function(response) {
        $scope.answers = response.data;
      }, function(err) {
        console.log(err);
      });
  });
