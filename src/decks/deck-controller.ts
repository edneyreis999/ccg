import * as Hapi from "hapi";
import { IDeck } from "./deck";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";

export default class DeckController {

    private database: IDatabase;
    private configs: IServerConfigurations;

    constructor(configs: IServerConfigurations, database: IDatabase) {
        this.configs = configs;
        this.database = database;
    }

    public async createDeck(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {    
        var newDeck: IDeck = request.payload;

        try {
            let deck: IDeck = await this.database.deckModel.create(newDeck);
            return reply(deck).code(201);
        }catch (error) {
            return reply(error);
        }
    }

    public async updateDeck(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {       
        let userId = request.params["userId"];
        let id = request.params["id"];

        try {
            let deck: IDeck = await this.database.deckModel.findByIdAndUpdate(
                { _id: id, userId: userId },
                { $set: request.payload },
                { new: true }
            );

            if (deck) {
                reply(deck);
            } else {
                reply("Deck not found by ID = "+id+" and userId ="+userId);
            }

        } catch (error) {
            return reply(error);
        }
    }

    public async deleteDeck(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {       
        let id = request.params["id"];
        let userId = request.params["userId"];

        let deletedDeck = await this.database.deckModel.findOneAndRemove({ _id: id, userId: userId });

        if (deletedDeck) {
            return reply(deletedDeck);
        } else {
            return reply("Deck not found by ID = "+id+" and userId ="+userId);
        }    
    }

    public async getDeckById(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {      
        let userId = request.params["userId"];
        let id = request.params["id"];
        try{
            let deck = await this.database.deckModel.find({ _id: id, userId: userId }).lean(true);

            if (deck) {
                reply(deck);
            } else {
                reply("Deck not found by ID = "+id+" and userId ="+userId);
            }
        } catch (error) {
            return reply(error);
        }        
    }

    public async getDecks(request: Hapi.Request, reply: Hapi.ReplyNoContinue) { 
        let userId = request.params["userId"];
        let top = request.query['top'];
        let skip = request.query['skip'];
        let decks = await this.database.deckModel.find({ userId: userId }).lean(true).skip(skip).limit(top);

        return reply(decks);
    }
}