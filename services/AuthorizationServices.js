const fs = require('fs');

class AuthorizationServices {

    findLoginByLogin(login) {
        return new Promise((res, rej) => {
            fs.readFile('./data/authData.json', 'utf8', (err, data) => {
                if(err) throw new Error(err);

                let parseData = JSON.parse(data);
                let user = parseData.find(i => i.login == login);
                res(user);
            })
        })
    };

    createUser(user) {
        return new Promise((res, rej) => {
            fs.readFile('./data/authData.json', 'utf8', (err, data) => {
                if(err) throw new Error(err);

                let parseData = JSON.parse(data);
                parseData.push(user);

                fs.writeFile('./data/authData.json', JSON.stringify(parseData), err => {
                    if(err) throw new Error(err);

                    res(user);
                })
            })
        })
    }

}

module.exports = new AuthorizationServices();