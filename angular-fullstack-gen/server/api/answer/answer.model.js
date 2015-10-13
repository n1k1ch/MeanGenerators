'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AnswerSchema = new Schema({
  question: {
    type: Schema.Types.ObjectId,
    ref: "Question",
    required: 'Question is required'
  },
  interview: {
    type: Schema.Types.ObjectId,
    ref: "Interview",
    required: 'Interview is required'
  },
  rate: {
    type: Number
  },
  comment: {
    type: String
  },
  startedAt: {
    type: Date
  },
  finishedAt: {
    type: Date
  }
});

module.exports = mongoose.model('Answer', AnswerSchema);
