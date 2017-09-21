import * as Hapi from "hapi";
import { ICard } from "./card";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";
import { IAvatarCardRules, IAvatarActionInfo, IActionType, AvatarActionType, IHeroCardInfo, IHeroCardRules} from "./card-rules"
import { HeroClass, AvatarClass } from '../champion/champion-rules'
export default class CardController {

    private database: IDatabase;
    private configs: IServerConfigurations;

    constructor(configs: IServerConfigurations, database: IDatabase) {
        this.configs = configs;
        this.database = database;
    }

    public async createCard(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        //let newCard: ICard = request.payload;
        let actionInfo1: IAvatarActionInfo = {name:'single target', description:'do damage to just one enemie'};
        let actionInfo2: IAvatarActionInfo = {name:'freeze', description:'freeze enemy enemie'};
        let rules: IAvatarCardRules = {name: 'freezes a single enemy', action: AvatarActionType.SPELL, actionInfo: [actionInfo1, actionInfo2]};
        let newCard: ICard = {userId: '1', class:AvatarClass.TROLL , name: 'Ice Lance', description:'A Single target ice lance who freeze the enemy', version: 1, rules: rules, createdAt: new Date(), updateAt: new Date()};
        console.log(newCard);

        try {
            let card: ICard = await this.database.cardModel.create(newCard);
            return reply(card).code(201);
        } catch (error) {
            return reply(error);
        }
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
}