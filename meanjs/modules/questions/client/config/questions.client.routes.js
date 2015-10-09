'use strict';

angular.module('questions').config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('questions', {
            abstract: true,
            url: '/questions',
            template: '<ui:view/>'
        })
        .state('questions.list', {
            url: '',
            templateUrl: 'modules/questions/client/views/list-questions.client.view.html'
        })
        .state('questions.create', {
            url: '/create',
            templateUrl: 'modules/questions/client/views/create-question.client.view.html',
            data: {
                roles: ['user', 'admin']
            }
        })
        .state('questions.view', {
            url: '/:questionId',
            templateUrl: 'modules/questions/client/views/view-question.client.view.html'
        })
        .state('questions.edit', {
            url: '/:questionId/edit',
            templateUrl: 'modules/questions/client/views/edit-question.client.view.html',
            data: {
                roles: ['user', 'admin']
            }
        });
}]);
