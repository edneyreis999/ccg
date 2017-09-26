import * as Hapi from "hapi";
import { IChampion } from "./champion";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";
import { HeroClass, AvatarClass, EChampionFaction } from './champion-rules'

export default class ChampionController {

    private database: IDatabase;
    private configs: IServerConfigurations;

    constructor(configs: IServerConfigurations, database: IDatabase) {
        this.configs = configs;
        this.database = database;
    }

    public async createChampion(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let newChampion: IChampion = request.payload;
        console.log(newChampion);

        // Calcula assetName para o champion
        this.getChampionByFactionAndClass(newChampion.faction, newChampion.class).then((champions: Array<IChampion>) => {
            let assetName: string = "";
            // Seta a facção
            assetName = EChampionFaction[newChampion.faction] + "_";
            // Seta a classe
            if(EChampionFaction.HERO === newChampion.faction){
                assetName += HeroClass[newChampion.class] + "_";
            }else if(EChampionFaction.AVATAR === newChampion.faction){
                assetName += AvatarClass[newChampion.class] + "_";
            }
            // seta o numero
            if(champions.length > 0){
                let champion: IChampion = champions.sort((n1, n2) => n1.assetNumber - n2.assetNumber)[champions.length - 1];
                newChampion.assetNumber = champion.assetNumber + 1;
                assetName += newChampion.assetNumber;
            }else {
                newChampion.assetNumber = 1;
                assetName += newChampion.assetNumber;
            }
            newChampion.assetName = assetName;
            
            console.log(newChampion);
            try {
                let champion: IChampion = this.database.championModel.create(newChampion);
                return reply(champion).code(201);
            } catch (error) {
                return reply(error);
            }
        });
    }

    public async updateChampion(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let id = request.params["id"];
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            let championPayload: IChampion = request.payload;
            try {
                let champion: IChampion = await this.database.championModel.findByIdAndUpdate(
                    { _id: id },
                    { $set: championPayload },
                    { new: true }
                );
                if (champion) {
                    return reply(champion);
                } else {
                    return reply("Champion com id: " + id + " não foi encontrado");
                }
            } catch (error) {
                return reply(error);
            }
        } else {
            return reply("invalid champion id: " + id);
        }

    }

    public async deleteChampion(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let id = request.params["id"];

        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            let deletedChampion = await this.database.championModel.findOneAndRemove({ _id: id });
            return reply(deletedChampion);
        } else {
            return reply("invalid champion id: " + id);
        }

    }

    public async getChampionById(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let id = request.params["id"];
        try {
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                let champion = await this.database.championModel.findOne({ _id: id }).lean(true);

                if (champion) {
                    return reply(champion);
                } else {
                    return reply("Champion com id: " + id + " não encontrado.");
                }

            } else {
                return reply("invalid champion id: " + id);
            }

        } catch (error) {
            return reply(error);
        }
    }

    public async getChampions(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let champions = await this.database.championModel.find({}).lean(true);
        if (champions) {
            return reply(champions);
        } else {
            return reply("Ainda não temos nenhum Champion cadastrado");
        }
    }

    private async getChampionByFactionAndClass(faction: EChampionFaction, classe: HeroClass | AvatarClass, ): Promise<Array<IChampion>> {
        let champions = await this.database.championModel.find({ faction: faction, class: classe });

        return champions;
    }
}