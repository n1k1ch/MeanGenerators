/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Interview = require('./interview.model');

exports.register = function(socket) {
  Interview.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Interview.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('interview:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('interview:remove', doc);
}