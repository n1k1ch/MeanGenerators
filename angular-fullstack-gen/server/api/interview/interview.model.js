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
  startedAt: {
    type: Date
  },
  finishedAt: {
    type: Date
  },
  info: {
    type: String
  }
});

module.exports = mongoose.model('Interview', InterviewSchema);
