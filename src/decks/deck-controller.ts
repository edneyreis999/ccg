import * as Hapi from "hapi";
import { IDeck, IDeckPayload } from "./deck";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";

import { IHeroChampionRules, HeroClass, IAvatarChampionRules, AvatarClass } from '../champion/champion-rules';
import { IHeroDeckRules, DeckType, IAvatarDeckRules } from './deck-rules'

export default class DeckController {

    private database: IDatabase;
    private configs: IServerConfigurations;

    constructor(configs: IServerConfigurations, database: IDatabase) {
        this.configs = configs;
        this.database = database;
    }

    public async createDeck(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let deckPayload: IDeckPayload = request.payload;

        let newDeck: IDeck = { name: deckPayload.info.name, description: deckPayload.info.description, userId: deckPayload.info.userId, rules: deckPayload.info.rules, type: deckPayload.type, createdAt: new Date(), updateAt: new Date() };
        if (this.validateDeckPayload(newDeck)) {
            // calcula ultimate
            if (newDeck.type === DeckType.HERO_DECK) {
                let heroRules: IHeroDeckRules = <IHeroDeckRules>newDeck.rules;
                let ultimateName = 'ULTIMATE_';

                heroRules.heros.forEach(hero => {
                    if (HeroClass.WARRIOR === hero.class) {
                        ultimateName += 'W';
                    }
                    else if (HeroClass.RANGE === hero.class) {
                        ultimateName += 'R';
                    }
                    else if (HeroClass.PRIEST === hero.class) {
                        ultimateName += 'P';
                    }
                });

                heroRules.ultimate = ultimateName;
                newDeck.rules = heroRules;
            }

            console.log(newDeck);
            try {
                let deck: IDeck = await this.database.deckModel.create(newDeck);
                return reply(deck).code(201);
            } catch (error) {
                return reply(error);
            }
        } else {
            return reply("Payload não é valido");
        }

    }

    public async updateDeck(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let userId = request.params["userId"];
        let id = request.params["id"];
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            let deckPayload: IDeckPayload = request.payload;
            let newDeck: IDeck = { name: deckPayload.info.name, description: deckPayload.info.description, userId: deckPayload.info.userId, rules: deckPayload.info.rules, type: deckPayload.type, createdAt: new Date(), updateAt: new Date() };
            try {
                let deck: IDeck = await this.database.deckModel.findByIdAndUpdate(
                    { _id: id, userId: userId },
                    { $set: newDeck },
                    { new: true }
                );

                return reply(deck);
            } catch (error) {
                return reply(error);
            }
        } else {
            return reply("invalid deck id: " + id);
        }

    }

    public async deleteDeck(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let id = request.params["id"];
        let userId = request.params["userId"];

        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            let deletedDeck = await this.database.deckModel.findOneAndRemove({ _id: id, userId: userId });
            return reply(deletedDeck);
        } else {
            return reply("invalid deck id: " + id);
        }
    }

    public async getDeckById(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let userId = request.params["userId"];
        let id = request.params["id"];
        try {
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                let deck = await this.database.deckModel.find({ _id: id, userId: userId }).lean(true);
                return reply(deck);
            } else {
                return reply("invalid deck id: " + id);
            }

        } catch (error) {
            return reply(error);
        }
    }

    public async getDecks(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let userId = request.params["userId"];
        let decks = await this.database.deckModel.find({ userId: userId }).lean(true);

        return reply(decks);
    }

    private validateDeckPayload(deck: IDeck): boolean {
        let isDeckvalid: boolean = false;
        if (deck.type === DeckType.HERO_DECK) {
            let rules: IHeroDeckRules = <IHeroDeckRules>deck.rules;
            //valida se tem 3 herois
            if (rules.heros.length === 3) {
                rules.heros.forEach(hero => {
                    if (!this.validHeroDeck(hero)) {
                        return false;
                    }
                });
            } else {
                return false;
            }
        } else if (deck.type === DeckType.AVATAR_DECK) {
            let rules: IAvatarDeckRules = <IAvatarDeckRules>deck.rules;
            //valida se tem 3 herois
            if (rules.avatar != null) {
                return this.validAvatarDeck(rules.avatar);
            } else {
                return false;
            }
        } else {
            console.log("Verificar payload, deck não identificado");
        }
        return true;
    }

    private validHeroDeck(champion: IHeroChampionRules): boolean {
        // verifica se tem apenas duas action cards
        if (champion.actionCards.length !== 2) {
            return false;
        }
        // verifica se as actions cards são da mesma classe dele
        champion.actionCards.forEach(card => {
            if (card.class !== champion.class) {
                return false;
            }
            // validar se as rules da carta está certo
        });
        return true;
    }

    private validAvatarDeck(avatar: IAvatarChampionRules): boolean {
        let isValidDeck: boolean = true;
        if (avatar.spellCards.length !== 4) {
            return false;
        }
        if (avatar.objectiveCards.length !== 2) {
            return false;
        }
        if (avatar.enrageCard.class !== avatar.class) {
            return false;
        }
        
        avatar.spellCards.forEach(spell => {
            if (spell.class !== avatar.class) {
                isValidDeck = false;
                return;
            }
        });
        avatar.objectiveCards.forEach(objective => {
            if (objective.class !== avatar.class) {
                isValidDeck = false;
                return
            }
        });

        return isValidDeck;
    }

}