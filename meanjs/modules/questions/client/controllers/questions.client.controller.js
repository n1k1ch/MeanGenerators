'use strict';

angular.module('questions').controller('QuestionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Questions',
    function ($scope, $stateParams, $location, Authentication, Questions) {
        $scope.authentication = Authentication;

        $scope.create = function(isValid) {
            $scope.error = null;

            if(!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'questionForm');

                return false;
            }

            var question = new Questions({
               text: this.text
            });

            question.$save(function(response) {
                //$location.path('questions/' + response._id);
                $location.path('questions');//i want to go to the list

                $scope.text = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.remove = function(question) {
            if(question) {
                question.$remove();

                for(var i in $scope.questions) {
                    if($scope.questions[i] === question) {
                        $scope.questions.splice(i, 1);
                    }
                }
            } else {
                $scope.question.$remove(function () {
                    $location.path('questions');
                });
            }
        };

        $scope.update = function(isValid) {
            $scope.error = null;

            if(!isValid) {
                $scope.broadcast('show-errors-check-validity', 'questionsForm');

                return false;
            }

            var question = $scope.question;

            question.$update(function(){
                //$location.path('questions/' + question._id);
                $location.path('questions');//i want to go to the list
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.find = function() {
            $scope.questions = Questions.query();
        };

        $scope.findOne = function() {
            $scope.question = Questions.get({
                questionId: $stateParams.questionId
            });
        };
    }]);
