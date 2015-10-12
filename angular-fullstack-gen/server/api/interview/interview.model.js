'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var InterviewSchema = new Schema({
  interviewee: {
    type: String,
    required: 'Interviewee is required'
  },
  position: {
    type: String,
    required: 'Position is required'
  },
  startedOn: {
    type: Date
  },
  finishedOn: {
    type: Date
  },
  info: {
    type: String
  },
  answers: [{
    type: Schema.ObjectId,
    refs: 'Answer'
  }]
});

module.exports = mongoose.model('Interview', InterviewSchema);
