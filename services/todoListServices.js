const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

class TodoListServices {

    getTodos() {
        return new Promise((res, rej) => {
            fs.readFile('./data/todoData.json', 'utf8', (err, data) => {
                if(err) throw new Error(err);

                res(JSON.parse(data));
            })
        })
    };

    createTodo(body) {
        return new Promise((res, rej) => {
            fs.readFile('./data/todoData.json', 'utf8', (err, data) => {
                if(err) throw new Error(err);

                let parseData = JSON.parse(data);
                const user = {
                    id: uuidv4(),
                    title: body.title,
                    isCompleted: false,
                    idUser: uuidv4()
                }
                parseData.push(user);

                fs.writeFile('./data/todoData.json', JSON.stringify(parseData), (err) => {
                    if(err) throw new Error(err);

                    res(body);
                })
            })
        })
    };

    editTodo(id, title) {
        return new Promise((res, rej) => {
            fs.readFile('./data/todoData.json', 'utf8', (err, data) => {
                if(err) throw new Error(err);

                let parseData = JSON.parse(data);
                parseData[id].title = title

                fs.writeFile('./data/todoData.json', JSON.stringify(parseData), (err) => {
                    if(err) throw new Error(err);

                    res(parseData[id]);
                })
            })
        })
    };

    editIsCompleted(id) {
        return new Promise((res, rej) => {
            fs.readFile('./data/todoData.json', 'utf8', (err, data) => {
                if(err) throw new Error(err);

                let parseData = JSON.parse(data);
                parseData.map((i, ind) => ind === +id ? i.isCompleted = !i.isCompleted : i);

                fs.writeFile('./data/todoData.json', JSON.stringify(parseData), err => {
                    if(err) throw new Error(err);

                    res(parseData[id]);
                })
            })
        })
    };

    deleteTask(id) {
        return new Promise((res, rej) => {
            fs.readFile('./data/todoData.json', 'utf8', (err, data) => {
                if(err) throw new Error(err);

                let parseData = JSON.parse(data);
                if(!parseData[id]) {
                    res(false);
                }
                parseData.splice(id, 1);

                fs.writeFile('./data/todoData.json', JSON.stringify(parseData), err => {
                    if(err) throw new Error(err);

                    res(true);
                })
            })
        })
    }
}

module.exports = new TodoListServices();