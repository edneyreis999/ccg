import * as Hapi from "hapi";
import { ICard } from "./card";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";
import { IAvatarCardRules, EAvatarActionType, IHeroCardRules, EHeroActionType, EActionEffect, IActionEffect } from "./card-rules"
import { HeroClass, AvatarClass, EChampionFaction } from '../champion/champion-rules'
export default class CardController {

    private database: IDatabase;
    private configs: IServerConfigurations;

    constructor(configs: IServerConfigurations, database: IDatabase) {
        this.configs = configs;
        this.database = database;
    }

    public async createCard(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let newCard: ICard = request.payload;  
        /*
        let rules: IAvatarCardRules = { action: 0, name: "Ice lance", actionEffect: [{ actionName: 0, actionValue: 10, description: "Spend 10 mana" }, { actionName: 1, description: "Freeze the enemy" }, { actionName: 2, actionValue: 2, description: "Do 2 damage" }] };
        let ruleDescription: string = EAvatarActionType[rules.action] + " => ";
        */

        this.getCardByFactionAndClass(newCard.faction, newCard.class, newCard.rules.action).then((cards: Array<ICard>) => {
            let assetName: string = "";
            let ruleDescription: string = "";
            // Seta a facção
            assetName = EChampionFaction[newCard.faction] + "_";
           
            if (EChampionFaction.HERO === newCard.faction) {
                 // Seta a classe
                assetName += HeroClass[newCard.class] + "_";
                // Seta action
                assetName += EHeroActionType[newCard.rules.action] + "_";

                // seta card rules description
                let rules:IHeroCardRules = <IHeroCardRules>newCard.rules;
                ruleDescription = EHeroActionType[rules.action] + " => ";
                ruleDescription += this.getActionRuleDescription(rules.actionEffect);  

            } else if (EChampionFaction.AVATAR === newCard.faction) {
                assetName += AvatarClass[newCard.class] + "_";
                // Seta action
                assetName += EAvatarActionType[newCard.rules.action] + "_";

                // seta card rules description
                let rules:IAvatarCardRules = <IAvatarCardRules>newCard.rules;
                ruleDescription = EAvatarActionType[rules.action] + " => ";
                ruleDescription += this.getActionRuleDescription(rules.actionEffect);      
            }
            // seta o numero
            if (cards.length > 0) {
                let champion: ICard = cards.sort((n1, n2) => n1.assetNumber - n2.assetNumber)[cards.length - 1];
                newCard.assetNumber = champion.assetNumber + 1;
                assetName += newCard.assetNumber;
            } else {
                newCard.assetNumber = 1;
                assetName += newCard.assetNumber;
            }
            newCard.assetName = assetName;
            newCard.ruleDescription = ruleDescription;

            console.log(newCard);
            try {
                let card: ICard = this.database.cardModel.create(newCard);
                return reply(card).code(201);
            } catch (error) {
                return reply(error);
            }
        })


    }

    public async updateCard(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let id = request.params["id"];
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            let cardPayload: ICard = request.payload;
            try {
                let card: ICard = await this.database.cardModel.findByIdAndUpdate(
                    { _id: id },
                    { $set: cardPayload },
                    { new: true }
                );
                if (card) {
                    return reply(card);
                } else {
                    return reply("Card com id: " + id + " não foi encontrado");
                }
            } catch (error) {
                return reply(error);
            }
        } else {
            return reply("invalid card id: " + id);
        }

    }

    public async deleteCard(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let id = request.params["id"];

        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            let deletedCard = await this.database.cardModel.findOneAndRemove({ _id: id });
            return reply(deletedCard);
        } else {
            return reply("invalid card id: " + id);
        }

    }

    public async getCardById(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let id = request.params["id"];
        try {
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                let card = await this.database.cardModel.findOne({ _id: id }).lean(true);

                if (card) {
                    return reply(card);
                } else {
                    return reply("Card com id: " + id + " não encontrado.");
                }

            } else {
                return reply("invalid card id: " + id);
            }

        } catch (error) {
            return reply(error);
        }
    }

    public async getCards(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let cards = await this.database.cardModel.find({}).lean(true);
        if (cards) {
            return reply(cards);
        } else {
            return reply("Ainda não temos nenhum Card cadastrado");
        }
    }

    private async getCardByFactionAndClass(faction: EChampionFaction, classe: HeroClass | AvatarClass, action: EAvatarActionType | EHeroActionType): Promise<Array<ICard>> {
        let cards = await this.database.cardModel.find({ faction: faction, class: classe, rules: { action: action } });

        return cards;
    }
    private getActionRuleDescription(actionsEffect:Array<IActionEffect>):string{
        let ruleDescription = "";
        for (var i = 0; i < actionsEffect.length; i++) {
            let effect: IActionEffect = actionsEffect[i];
            if (effect.actionValue) {
                ruleDescription += EActionEffect[effect.actionName] + "_" + effect.actionValue;
            } else {
                ruleDescription += EActionEffect[effect.actionName];
            }

            if (i !== actionsEffect.length - 1) {
                ruleDescription += " + ";
            }
        } 
        return ruleDescription;
    }
}