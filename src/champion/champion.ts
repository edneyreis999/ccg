import * as Mongoose from "mongoose";
import { IAvatarChampionRules, IHeroChampionRules } from './champion-rules'

export interface IChampion extends Mongoose.Document {
    userId: string;
    rules: IAvatarChampionRules | IHeroChampionRules;
    description?: string;
    version: string;
    createdAt: Date;
    updateAt: Date;
}

export const ChampionSchema = new Mongoose.Schema({
    userId: { type: String, required: true },
    rules: { type: Object, required: true },
    description: String,
    version: String
}, {
        timestamps: true
    });

export const ChampionModel = Mongoose.model<IChampion>('Champion', ChampionSchema);