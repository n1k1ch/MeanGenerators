/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Question = require('./question.model');

exports.register = function(socket) {
  Question.schema.post('save', function (doc) {
    onSave(socket, doc);
    console.log('question.socket save registered');
  });
  Question.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  console.log('question.socket emitting save');
  socket.emit('question:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('question:remove', doc);
}
