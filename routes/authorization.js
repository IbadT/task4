const Sentry = require('@sentry/node');
const express = require('express');
const router = express.Router();
const AuthorizationControllers = require('../controllers/authorizationControllers.js');
const { check, validationResult } = require('express-validator');



const validation = [
    check('login', 'Invalid Login').isLength({min: 5, max: 12}),
    check('password', 'Invalid Password').isLength({min: 6, max: 20})
]



router.post('/login', validation, async (req, res) => {
    try {
        validationResult(req).throw();
        const { login, password } = req.body;
        const token = await AuthorizationControllers.login(login, password);
        if(token == null) {
            return res.json({ message: 'invalid login'})
        }
        res.send(token);
    } catch (error) {
        res.json({ error });
        Sentry.captureException(error);
    }
});

router.post('/register', validation, async (req, res) => {
    try {
        validationResult(req).throw();
        const { login, password } = req.body;
        const user = await AuthorizationControllers.register(login, password);
        if(user == null) {
            return res.json({
                message: 'This Login is already in use'
            })
        }
        res.send(user);
    } catch (error) {
        res.json({ error });
        Sentry.captureException(error);
    }
});

module.exports = router;