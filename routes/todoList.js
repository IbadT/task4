require('dotenv').config();
const express = require('express');
const router = express.Router();
const Sentry = require('@sentry/node');
const jwt = require('jsonwebtoken')
const TodoListControllers = require('../controllers/todoListControllers.js');
const { check, checkSchema, validationResult } = require('express-validator');

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InRlc3QxMjMiLCJwYXNzd29yZCI6IkliYWRUb2ZmMSIsImlhdCI6MTY3ODk3MTMxMX0.TmiJEChKF5JpzRLgCTPp07e9bihJjyCo8bz-OgH96Ds


function validation(req, res, next) {
    try {
        const authToken = req.headers.authorization;
        const token = authToken && authToken.split(' ')[1];
        if(token === null) res.sendStatus(401);
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, data) => {
            if(err) throw new Error('invalid token');
            req.user = data;
            next();
        })
    } catch (error) {
        res.sendStatus(403);
    }
}

router.get('/', validation, async (req, res) => {
    try {
        const todos = await TodoListControllers.getTodos();
        res.json(todos);
    } catch (error) {
        res.json(error);
        Sentry.captureException(error);
    }
})

router.get('/todos', async (req, res) => {
    try {
        const todos = await TodoListControllers.getTodos();
        res.send(todos);
    } catch (error) {
        res.json({ error });
        Sentry.captureException(error);
    }
})

router.post('/todos', 
    checkSchema({
        id: {
            optional: true,
            isUUID: true
        },
        title: {
            trim: true,
            custom: {
                options: title => !!title
            }
        },
        idUser: {
            optional: true,
            isUUID: true
        }
    }), 
    async (req, res) => {
        try {
            validationResult(req).throw();
            const todo = await TodoListControllers.createNewTodo(req.body);
            res.send(todo);
        } catch (error) {
            res.json({ error });
            Sentry.captureException(error);
        }
})

router.patch('/todos/:id', 
    check('title', 'Bad Title').isLength({min: 1, max: 100}),
    async (req, res) => {
    try {
        validationResult(req).throw();
        const todo = await TodoListControllers.editTodoById(req.params.id, req.body.title);
        res.send(todo);
    } catch (error) {
        res.json({error});
        Sentry.captureException(error);
    }
})

router.patch('/todos/:id/isCompleted', async (req, res) => {
    try {
        const todo = await TodoListControllers.editTodoIsCompleted(req.params.id);
        res.send(todo);
    } catch (error) {
        res.json({ error });
        Sentry.captureException(error);
    }
})

router.delete('/todos/:id',  async (req, res) => {
    try {
        const bool = await TodoListControllers.deleteTaskById(req.params.id);
        res.send(bool);
    } catch (error) {
        res.json({ error })
        Sentry.captureException(error);
    }
})

module.exports = router;