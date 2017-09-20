"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deck_controller_1 = require("./deck-controller");
function default_1(server, configs, database) {
    const deckController = new deck_controller_1.default(configs, database);
    server.bind(deckController);
    server.route({
        method: 'GET',
        path: '/decks/{userId}/{id}',
        config: {
            handler: deckController.getDeckById,
            description: 'Get deck by id'
        }
    });
    server.route({
        method: 'GET',
        path: '/decks/{userId}',
        config: {
            handler: deckController.getDecks,
            tags: ['api', 'decks'],
            description: 'Get all decks.'
        }
    });
    server.route({
        method: 'DELETE',
        path: '/decks/{userId}/{id}',
        config: {
            handler: deckController.deleteDeck,
            tags: ['api', 'decks'],
            description: 'Delete deck by id.'
        }
    });
    server.route({
        method: 'PUT',
        path: '/decks/{userId}/{id}',
        config: {
            handler: deckController.updateDeck,
            tags: ['api', 'decks'],
            description: 'Update deck by id.',
        }
    });
    server.route({
        method: 'POST',
        path: '/decks',
        config: {
            handler: deckController.createDeck,
            tags: ['api', 'decks'],
            description: 'Create a deck.',
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=c:/Users/Desktop/Desktop/Typescript/Octagon/ccg/js/src/deck/routes.js.map