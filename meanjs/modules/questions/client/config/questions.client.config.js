'use strict';

angular.module('questions').run(['Menus',
    function (Menus) {
        Menus.addMenuItem('topbar', {
            title: 'Questions',
            state: 'questions',
            type: 'dropdown',
            roles: ['*']
        });

        Menus.addSubMenuItem('topbar', 'questions', {
            title: 'All Questions',
            state: 'questions.list'
        });

        Menus.addSubMenuItem('topbar', 'questions', {
            title: 'Create Question',
            state: 'questions.create',
            roles: ['user']
        });
    }
]);
