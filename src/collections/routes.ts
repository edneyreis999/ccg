import * as Hapi from "hapi";
import CollectionController from "./collection-controller";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";

export default function (server: Hapi.Server, configs: IServerConfigurations, database: IDatabase) {

    const collectionController = new CollectionController(configs, database);
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