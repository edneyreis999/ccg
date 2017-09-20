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
class CollectionController {
    constructor(configs, database) {
        this.configs = configs;
        this.database = database;
    }
    createCollection(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            return reply("createCollection");
        });
    }
    updateCollection(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            return reply("updateCollection");
        });
    }
    deleteCollection(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            return reply("deleteCollection");
        });
    }
    getCollectionById(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = request.params["id"];
            reply("getCollectionById id = " + id);
        });
    }
    getCollections(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            reply("getCollections");
        });
    }
}
exports.default = CollectionController;
//# sourceMappingURL=c:/Users/Desktop/Desktop/Typescript/Octagon/ccg/js/src/collections/collection-controller.js.map