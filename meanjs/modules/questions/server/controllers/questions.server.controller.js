'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    Question = mongoose.model('Question'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    chalk = require('chalk');

exports.create = function(req, res) {
    var question = new Question(req.body);
    question.user = req.user;

    question.save(function(err) {
        if(err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(question);
        }
    });
};

exports.read = function(req, res) {
    res.json(req.question);
};

exports.update = function(req, res) {
    var question = req.question;

    question.text = req.body.text;

    question.save(function(err) {
        if(err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(question);
        }
    });
};

exports.delete = function(req, res) {
    var question = req.question;

    question.remove(function (err) {
        if(err) {
            return res.states(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(question);
        }
    });
};

exports.list = function(req, res) {
    Question.find().sort('-created').populate('user', 'displayName').exec(function(err, questions) {
        if(err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(questions);
        }
    });
};

exports.questionById = function(req, res, next, id) {
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Question is invalid'
        });
    }

    Question.findById(id).populate('user', 'displayName').exec(function (err, question) {
        if(err) {
            return next(err);
        } else if (!question) {
            return res.status(404).send({
                message: 'No question with that IDentifier has been found'
            });
        }

        req.question = question;
        next();
    });
};
