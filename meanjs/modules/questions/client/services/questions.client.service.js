'use strict';

angular.module('questions').factory('Questions', ['$resource', function($resource){
    return $resource('api/questions/:questionId', {
        questionId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
