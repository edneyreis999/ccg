import * as Hapi from "hapi";
import DeckController from "./deck-controller";
import * as DeckValidator from "./deck-validator";
import * as Joi from "joi";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";

export default function (server: Hapi.Server, configs: IServerConfigurations, database: IDatabase) {

    const deckController = new DeckController(configs, database);
    server.bind(deckController);

    server.route({
        method: 'GET',
        path: '/decks/{userId}/{id}',
        config: {
            handler: deckController.getDeckById,
            description: 'Get deck by id',
            validate: {
                params: {
                    id: Joi.string().required(),
                    userId: Joi.string().required()
                },
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/decks/{userId}',
        config: {
            handler: deckController.getDecks,
            tags: ['api', 'decks'],
            description: 'Get all decks.',
            validate: {
                params: {
                    userId: Joi.string().required()
                },
            }
        }
    });

    server.route({
        method: 'DELETE',
        path: '/decks/{userId}/{id}',
        config: {
            handler: deckController.deleteDeck,
            tags: ['api', 'decks'],
            description: 'Delete deck by id.',
            validate: {
                params: {
                    id: Joi.string().required(),
                    userId: Joi.string().required()
                },
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/decks/{userId}/{id}',
        config: {
            handler: deckController.updateDeck,
            tags: ['api', 'decks'],
            description: 'Update deck by id.',
            validate: {
                params: {
                    id: Joi.string().required(),
                    userId: Joi.string().required()
                },
                payload: DeckValidator.verifyDeckModelAttributes
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/decks/{userId}',
        config: {
            handler: deckController.createDeck,
            tags: ['api', 'decks'],
            description: 'Create a deck.',
            validate: {
                params: {
                    userId: Joi.string().required()
                },
                payload: DeckValidator.verifyDeckModelAttributes
            }
        }
    });
}