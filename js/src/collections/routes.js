"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_controller_1 = require("./task-controller");
function default_1(server, configs, database) {
    const taskController = new task_controller_1.default(configs, database);
    server.bind(taskController);
    server.route({
        method: 'GET',
        path: '/tasks/{id}',
        config: {
            handler: taskController.getTaskById,
            description: 'Get task by id'
        }
    });
    server.route({
        method: 'GET',
        path: '/tasks',
        config: {
            handler: taskController.getTasks,
            tags: ['api', 'tasks'],
            description: 'Get all tasks.'
        }
    });
    server.route({
        method: 'DELETE',
        path: '/tasks/{id}',
        config: {
            handler: taskController.deleteTask,
            tags: ['api', 'tasks'],
            description: 'Delete task by id.'
        }
    });
    server.route({
        method: 'PUT',
        path: '/tasks/{id}',
        config: {
            handler: taskController.updateTask,
            tags: ['api', 'tasks'],
            description: 'Update task by id.',
        }
    });
    server.route({
        method: 'POST',
        path: '/tasks',
        config: {
            handler: taskController.createTask,
            tags: ['api', 'tasks'],
            description: 'Create a task.',
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=c:/Users/Desktop/Desktop/Typescript/Octagon/ccg/js/src/collections/routes.js.map