import * as Hapi from "hapi";
import CollectionController from "./collection-controller";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";

export default function (server: Hapi.Server, configs: IServerConfigurations, database: IDatabase) {

    const collectionController = new CollectionController(configs, database);
    server.bind(collectionController);

    server.route({
        method: 'GET',
        path: '/collection/{userId}',
        config: {
            handler: collectionController.getPlayerCollection,
            description: 'Get collection by id'
        }
    });

    server.route({
        method: 'GET',
        path: '/collection/avatars/{userId}',
        config: {
            handler: collectionController.getPlayerAvatars,
            tags: ['api', 'collection'],
            description: 'Get all collection.'
        }
    });

    server.route({
        method: 'GET',
        path: '/collection/heroes/{userId}',
        config: {
            handler: collectionController.getPlayerHeros,
            tags: ['api', 'collection'],
            description: 'Get all collection.'
        }
    });

    server.route({
        method: 'GET',
        path: '/collection/cards/{userId}',
        config: {
            handler: collectionController.getPlayerCards,
            tags: ['api', 'collection'],
            description: 'Get all collection.'
        }
    });

    server.route({
        method: 'GET',
        path: '/collection/cards/avatar/{userId}',
        config: {
            handler: collectionController.getPlayerCardsAvatar,
            tags: ['api', 'collection'],
            description: 'Get all collection.'
        }
    });

    server.route({
        method: 'GET',
        path: '/collection/cards/hero/{userId}',
        config: {
            handler: collectionController.getPlayerHeroCards,
            tags: ['api', 'collection'],
            description: 'Get all collection.'
        }
    });
    
}