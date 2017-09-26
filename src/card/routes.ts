import * as Hapi from "hapi";
import CardController from "./card-controller";
import * as CardValidator from "./card-validator";
import * as Joi from "joi";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";

export default function (server: Hapi.Server, configs: IServerConfigurations, database: IDatabase) {

    const cardController = new CardController(configs, database);
    server.bind(cardController);

    server.route({
        method: 'GET',
        path: '/card/{id}',
        config: {
            handler: cardController.getCardById,
            description: 'Get card by id',
            validate: {
                params: {
                    id: Joi.string().required()
                },
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/card',
        config: {
            handler: cardController.getCards,
            tags: ['api', 'cards'],
            description: 'Get all cards.'
        }
    });

    server.route({
        method: 'DELETE',
        path: '/card/{id}',
        config: {
            handler: cardController.deleteCard,
            tags: ['api', 'cards'],
            description: 'Delete card by id.',
            validate: {
                params: {
                    id: Joi.string().required()
                },
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/card/{id}',
        config: {
            handler: cardController.updateCard,
            tags: ['api', 'cards'],
            description: 'Update card by id.',
            validate: {
                params: {
                    id: Joi.string().required()
                },
                payload: CardValidator.verifyCardModelAttributes
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/card',
        config: {
            handler: cardController.createCard,
            tags: ['api', 'cards'],
            description: 'Create a card.',
            validate: {
                payload: CardValidator.verifyCardModelAttributes,
            }
        }
    });
}