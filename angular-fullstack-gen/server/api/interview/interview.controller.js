'use strict';

var _ = require('lodash');
var Interview = require('./interview.model'),
  Answer = require('../answer/answer.model');

// Get list of interviews
exports.index = function(req, res) {
  Interview.find(function (err, interviews) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(interviews);
  });
};

// Get a single interview
exports.show = function(req, res) {
  Interview.findById(req.params.id, function (err, interview) {
    if(err) { return handleError(res, err); }
    if(!interview) { return res.status(404).send('Not Found'); }
    return res.json(interview);
  });
};

// Creates a new interview in the DB.
exports.create = function(req, res) {
  Interview.create(req.body, function(err, interview) {
    if(err) { return handleErrorMoreAccurate(res, err); }
    return res.status(201).json(interview);
  });
};

// Updates an existing interview in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Interview.findById(req.params.id, function (err, interview) {
    if (err) { return handleError(res, err); }
    if(!interview) { return res.status(404).send('Not Found'); }
    var updated = _.merge(interview, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(interview);
    });
  });
};

exports.updateWithAnswers = function(req, res) {
  Interview.findById(req.params.id, function(err, interview) {
      if(err) {
        return handleError(err);
      }

      if(!interview) {
        return res.status(404).send('Not Found');
      }

      var updated = _.merge(interview, req.body.interview);
      updated.save(function (err) {
        if(err) {
          return handleError(err);
        }

        var answers = req.body.answers;
        var countOfAnswers = answers.length;
        console.log(answers);

        for(var i = 0; i < answers.length; i++) {
          var curr = answers[i];

          console.log(curr);
          Answer.findById(curr._id, function(err, answer) {
            var updatedAnswer = _.merge(answer, curr);
            updatedAnswer.save(function(err) {
              if(err) {
                return handleError(err);
              }

              if(--countOfAnswers === 0) {
                return res.status(200).send('DONE');
              }
            });
          });
        }
      });
    })
};

// Deletes a interview from the DB.
exports.destroy = function(req, res) {
  Interview.findById(req.params.id, function (err, interview) {
    if(err) { return handleError(res, err); }
    if(!interview) { return res.status(404).send('Not Found'); }
    interview.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}

function handleErrorMoreAccurate(res, err) {
  //var messages = {};
  //
  //for(var key in err.errors) {
  //  console.log(key);
  //  console.log(err.errors[key]);
  //  messages[key] = err.errors[key].message;
  //}
  //
  //return res.status(400).send(messages);

  return res.status(400).send(err);
}
