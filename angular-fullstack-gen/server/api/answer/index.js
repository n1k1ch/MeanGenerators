'use strict';

var express = require('express');
var controller = require('./answer.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/for/interview/:id', controller.findForInterview);
router.post('/', controller.create);
router.post('/:interviewId/:questionId', controller.createForInteviewAndQuestion);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
