"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class TaskController {
    constructor(configs, database) {
        this.configs = configs;
        this.database = database;
    }
    createTask(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            let userId = request.auth.credentials.id;
            var newTask: ITask = request.payload;
            newTask.userId = userId;
    
            try {
                let task: ITask = await this.database.taskModel.create(newTask);
                return reply(task).code(201);
            }catch (error) {
                return reply(Boom.badImplementation(error));
            }
            */
            return reply("createTask");
        });
    }
    updateTask(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            let userId = request.auth.credentials.id;
            let id = request.params["id"];
    
            try {
                let task: ITask = await this.database.taskModel.findByIdAndUpdate(
                    { _id: id, userId: userId },
                    { $set: request.payload },
                    { new: true }
                );
    
                if (task) {
                    reply(task);
                } else {
                    reply(Boom.notFound());
                }
    
            } catch (error) {
                return reply(Boom.badImplementation(error));
            }
            */
            return reply("updateTask");
        });
    }
    deleteTask(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            let id = request.params["id"];
            let userId = request.auth.credentials.id;
    
            let deletedTask = await this.database.taskModel.findOneAndRemove({ _id: id, userId: userId });
    
            if (deletedTask) {
                return reply(deletedTask);
            } else {
                return reply(Boom.notFound());
            }
            */
            return reply("deleteTask");
        });
    }
    getTaskById(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            let userId = request.auth.credentials.id;
            let id = request.params["id"];
    
            let task = await this.database.taskModel.findOne({ _id: id, userId: userId }).lean(true);
    
            if (task) {
                reply(task);
            } else {
                reply(Boom.notFound());
            }
            */
            let id = request.params["id"];
            reply("getTaskById id = " + id);
        });
    }
    getTasks(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            let userId = request.auth.credentials.id;
            let top = request.query['top'];
            let skip = request.query['skip'];
            let tasks = await this.database.taskModel.find({ userId: userId }).lean(true).skip(skip).limit(top);
    
            return reply(tasks);
            */
            reply("getTasks");
        });
    }
}
exports.default = TaskController;
//# sourceMappingURL=c:/Users/Desktop/Desktop/Typescript/Octagon/ccg/js/src/collections/task-controller.js.map