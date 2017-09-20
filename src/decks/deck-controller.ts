import * as Hapi from "hapi";
import { IDeck } from "./deck";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";

import {IHeroChampionRules, HeroClass} from '../champion/champion-rules';
import {IHeroCardRules, IHeroCardInfo, IActionType} from '../card/card-rules';
import {IHeroDeckRules} from './deck-rules'

export default class DeckController {

    private database: IDatabase;
    private configs: IServerConfigurations;

    constructor(configs: IServerConfigurations, database: IDatabase) {
        this.configs = configs;
        this.database = database;
    }

    public async createDeck(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {    
        var newDeck: IDeck = request.payload;

        // gerou dois cards
        let action1: IActionType = {name: 'whirlwind', description: 'Deliver multiples attacks'};
        let action2: IActionType = {name: 'ignore pain', description: 'Reduce all damage taken by 50%'};

        let actionInfo1: IHeroCardInfo = {name: 'area effect', description: 'deal damage to all enemies'};
        let actionInfo2: IHeroCardInfo = {name: 'stun', description: 'after action hero cant attack 1 turn'};
        let actionInfo3: IHeroCardInfo = {name: 'reduce damage', description: 'reduce damage by x %'};
        let actionInfo4: IHeroCardInfo = {name: 'immunity', description: 'immunity to all crownd control effects'};

        let cardAction1: IHeroCardRules = {action: action1, actionInfo:[actionInfo1, actionInfo2], heroClass: HeroClass.WARRIOR, name: ''};
        let cardAction2: IHeroCardRules = {action: action2, actionInfo:[actionInfo3, actionInfo4], heroClass: HeroClass.WARRIOR, name: ''};

        // gerar tres heroi
        let champion1: IHeroChampionRules = {actionCards:[cardAction1, cardAction2], class:HeroClass.WARRIOR, health: 10, name:'Garoosh'};
        let champion2: IHeroChampionRules = {actionCards:[cardAction1, cardAction2], class:HeroClass.WARRIOR, health: 10, name:'Garoosh'};
        let champion3: IHeroChampionRules = {actionCards:[cardAction1, cardAction2], class:HeroClass.WARRIOR, health: 10, name:'Garoosh'};
        
        // gerar um deck
        let deckRules: IHeroDeckRules = {heros: [champion1, champion2, champion3]};
        let deck: IDeck = {name:'Deck de hero', description:'Bem massa', userId: '1', rules: deckRules, createdAt: new Date(), updateAt: new Date()};

        newDeck = deck;
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