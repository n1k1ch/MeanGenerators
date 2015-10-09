'use strict';

var acl = require('acl'),
    chalk = require('chalk');

console.log(chalk.red.bgWhite.bold('Hie from questions policy'));

acl = new acl(new acl.memoryBackend());

exports.invokeRolesPolicies = function() {
    acl.allow([{
        roles: ['user'],
        allows: [{
            resources: '/api/questions',
            permissions: ['get', 'post']
        }, {
            resources: 'api/questions/:questionId',
            permissions: ['get']
        }]
    }]);
};

exports.isAllowed = function(req, res, next) {
    var roles = (req.user) ? req.user.roles : ['guest'];

    if(req.question && req.user && req.question.user.id === req.user.id) {
        return next();
    }

    // Check for user roles
    acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
        if (err) {
            // An authorization error occurred.
            return res.status(500).send('Unexpected authorization error');
        } else {
            if (isAllowed) {
                // Access granted! Invoke next middleware
                return next();
            } else {
                return res.status(403).json({
                    message: 'User is not authorized'
                });
            }
        }
    });
};
