require('dotenv').config();
const AuthorizationServices = require('../services/AuthorizationServices.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class AuthorizationControllers {

    async login(login, password) {
        const findLogin = await AuthorizationServices.findLoginByLogin(login);
        if(findLogin) {
            const comparePass = await bcrypt.compare(password, findLogin.password);
            if(comparePass) {
                const token = jwt.sign({ login, password }, process.env.ACCESS_TOKEN);
                return token
            } else {
                return {message: 'invalid password'}
            }
        }
        return null;
    }

    async register(login, password) {
        const findUser = await AuthorizationServices.findLoginByLogin(login);
        if(!findUser) {
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(password, salt);
            const createdUser = await AuthorizationServices.createUser({ login, password: hashPass })
            return createdUser;
        } return null
    }

}

module.exports = new AuthorizationControllers();