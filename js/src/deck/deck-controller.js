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
class DeckController {
    constructor(configs, database) {
        this.configs = configs;
        this.database = database;
    }
    createDeck(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            var newDeck = request.payload;
            try {
                let deck = yield this.database.deckModel.create(newDeck);
                return reply(deck).code(201);
            }
            catch (error) {
                return reply(error);
            }
        });
    }
    updateDeck(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            let userId = request.params["userId"];
            let id = request.params["id"];
            try {
                let deck = yield this.database.deckModel.findByIdAndUpdate({ _id: id, userId: userId }, { $set: request.payload }, { new: true });
                if (deck) {
                    reply(deck);
                }
                else {
                    reply("Deck not found by ID = " + id + " and userId =" + userId);
                }
            }
            catch (error) {
                return reply(error);
            }
        });
    }
    deleteDeck(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = request.params["id"];
            let userId = request.params["userId"];
            let deletedDeck = yield this.database.deckModel.findOneAndRemove({ _id: id, userId: userId });
            if (deletedDeck) {
                return reply(deletedDeck);
            }
            else {
                return reply("Deck not found by ID = " + id + " and userId =" + userId);
            }
        });
    }
    getDeckById(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            let userId = request.params["userId"];
            let id = request.params["id"];
            try {
                let deck = yield this.database.deckModel.find({ _id: id, userId: userId }).lean(true);
                if (deck) {
                    reply(deck);
                }
                else {
                    reply("Deck not found by ID = " + id + " and userId =" + userId);
                }
            }
            catch (error) {
                return reply(error);
            }
        });
    }
    getDecks(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            let userId = request.params["userId"];
            let top = request.query['top'];
            let skip = request.query['skip'];
            let decks = yield this.database.deckModel.find({ userId: userId }).lean(true).skip(skip).limit(top);
            return reply(decks);
        });
    }
}
exports.default = DeckController;
//# sourceMappingURL=c:/Users/Desktop/Desktop/Typescript/Octagon/ccg/js/src/deck/deck-controller.js.map