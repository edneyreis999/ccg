import * as Hapi from "hapi";
import TaskController from "./task-controller";
//import * as TaskValidator from "./task-validator";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";

export default function (server: Hapi.Server, configs: IServerConfigurations, database: IDatabase) {

    const taskController = new TaskController(configs, database);
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