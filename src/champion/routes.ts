import * as Hapi from "hapi";
import ChampionController from "./champion-controller";
import * as Joi from "joi";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";

export default function (server: Hapi.Server, configs: IServerConfigurations, database: IDatabase) {

    const championController = new ChampionController(configs, database);
    server.bind(championController);

    server.route({
        method: 'GET',
        path: '/champion/{id}',
        config: {
            handler: championController.getChampionById,
            description: 'Get champion by id',
            validate: {
                params: {
                    id: Joi.string().required()
                },
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/champion',
        config: {
            handler: championController.getChampions,
            tags: ['api', 'champions'],
            description: 'Get all champions.'
        }
    });

    server.route({
        method: 'DELETE',
        path: '/champion/{id}',
        config: {
            handler: championController.deleteChampion,
            tags: ['api', 'champions'],
            description: 'Delete champion by id.',
            validate: {
                params: {
                    id: Joi.string().required()
                },
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/champion/{id}',
        config: {
            handler: championController.updateChampion,
            tags: ['api', 'champions'],
            description: 'Update champion by id.',
            validate: {
                params: {
                    id: Joi.string().required()
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/champion',
        config: {
            handler: championController.createChampion,
            tags: ['api', 'champions'],
            description: 'Create a champion.'            
        }
    });
}