import * as Hapi from "hapi";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";
import { IHeroChampionRules, HeroClass, IAvatarChampionRules, AvatarClass, EChampionFaction } from '../champion/champion-rules';

export default class CollectionController {

    private database: IDatabase;
    private configs: IServerConfigurations;

    constructor(configs: IServerConfigurations, database: IDatabase) {
        this.configs = configs;
        this.database = database;
    }

    public async getPlayerCollection(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let userId = request.params["userId"];
        let cards = await this.database.cardModel.find({ userId: userId }).lean(true);
        let champions = await this.database.championModel.find({ userId: userId }).lean(true);
        if (cards || champions) {
            return reply({cards, champions});
        } else {
            return reply("nenhum card ou champion cadastrado para o player id: "+userId);
        }
    }

    public async getPlayerAvatars(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let userId = request.params["userId"];
        
        let champions = await this.database.championModel.find({ userId: userId, faction: EChampionFaction.AVATAR}).lean(true);
        if (champions) {
            return reply(champions);
        } else {
            return reply("nenhum Avatar cadastrado para o player id: "+userId);
        }
    }

    public async getPlayerHeros(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let userId = request.params["userId"];
        
        let champions = await this.database.championModel.find({ userId: userId, faction: EChampionFaction.HERO}).lean(true);
        if (champions) {
            return reply(champions);
        } else {
            return reply("nenhum Avatar cadastrado para o player id: "+userId);
        }
    }

    public async getPlayerCards(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let userId = request.params["userId"];
        let cards = await this.database.cardModel.find({ userId: userId }).lean(true);
        if (cards) {
            return reply({cards});
        } else {
            return reply("nenhum card cadastrado para o player id: "+userId);
        }
    }

    public async getPlayerCardsAvatar(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let userId = request.params["userId"];
        let cards = await this.database.cardModel.find({ userId: userId, faction: EChampionFaction.AVATAR }).lean(true);
        if (cards) {
            return reply({cards});
        } else {
            return reply("nenhum card cadastrado para o player id: "+userId);
        }
    }

    public async getPlayerHeroCards(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let userId = request.params["userId"];
        let cards = await this.database.cardModel.find({ userId: userId, faction: EChampionFaction.HERO }).lean(true);
        if (cards) {
            return reply({cards});
        } else {
            return reply("nenhum card cadastrado para o player id: "+userId);
        }
    }
}