'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  text: {
    type: String,
    default: '',
    required: 'Text cannot be blank'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Question', QuestionSchema);
