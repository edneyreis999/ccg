"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collection_controller_1 = require("./collection-controller");
function default_1(server, configs, database) {
    const collectionController = new collection_controller_1.default(configs, database);
    server.bind(collectionController);
    server.route({
        method: 'GET',
        path: '/collections/{id}',
        config: {
            handler: collectionController.getCollectionById,
            description: 'Get collection by id'
        }
    });
    server.route({
        method: 'GET',
        path: '/collections',
        config: {
            handler: collectionController.getCollections,
            tags: ['api', 'collections'],
            description: 'Get all collections.'
        }
    });
    server.route({
        method: 'DELETE',
        path: '/collections/{id}',
        config: {
            handler: collectionController.deleteCollection,
            tags: ['api', 'collections'],
            description: 'Delete collection by id.'
        }
    });
    server.route({
        method: 'PUT',
        path: '/collections/{id}',
        config: {
            handler: collectionController.updateCollection,
            tags: ['api', 'collections'],
            description: 'Update collection by id.',
        }
    });
    server.route({
        method: 'POST',
        path: '/collections',
        config: {
            handler: collectionController.createCollection,
            tags: ['api', 'collections'],
            description: 'Create a collection.',
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=c:/Users/Desktop/Desktop/Typescript/Octagon/ccg/js/src/collections/routes.js.map