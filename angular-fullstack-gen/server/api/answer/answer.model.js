'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AnswerSchema = new Schema({
  question: {
    type: Schema.ObjectId,
    refs: "Question"
  },
  rate: {
    type: Number
  },
  comment: {
    type: String
  },
  givenAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Answer', AnswerSchema);
