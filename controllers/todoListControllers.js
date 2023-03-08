const TodoListServices = require('../services/todoListServices.js');

class TodoListControllers {

    async getTodos() {
        const users = await TodoListServices.getTodos();
        return users;
    };

    async createNewTodo(body) {
        const user = await TodoListServices.createTodo(body);
        return user;
    };

    async editTodoById(id, title) {
        const todo = await TodoListServices.editTodo(id, title);
        return todo;
    };

    async editTodoIsCompleted(id) {
        const todo = await TodoListServices.editIsCompleted(id);
        return todo;
    }

    async deleteTaskById(id) {
        const bool = await TodoListServices.deleteTask(id);
        return bool;
    };

}

module.exports = new TodoListControllers();