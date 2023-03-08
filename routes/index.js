const express = require('express');
const router = express.Router();

const todoList = require('./todoList');
router.use('/todo', todoList);

const authorization = require('./authorization.js');
router.use('/authorization', authorization);

module.exports = router;