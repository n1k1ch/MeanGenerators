'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AnswerSchema = new Schema({
  question: {
    type: Schema.ObjectId,
    ref: "Question",
    required: 'Question is required'
  },
  interview: {
    type: Schema.ObjectId,
    ref: "Interview",
    required: 'Interview is required'
  },
  rate: {
    type: Number
  },
  comment: {
    type: String
  },
  givenAt: {
    type: Date
  }
});

module.exports = mongoose.model('Answer', AnswerSchema);
