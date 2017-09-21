import * as Mongoose from "mongoose";
import { IAvatarChampionRules, IHeroChampionRules, AvatarClass, HeroClass } from './champion-rules'

export interface IChampion extends Mongoose.Document {
    userId: string;
    rules?: IAvatarChampionRules | IHeroChampionRules;
    name: string;
    class: AvatarClass | HeroClass;
    health?: number;
    description?: string;
    version: number;
    createdAt: Date;
    updateAt: Date;
}

export const ChampionSchema = new Mongoose.Schema({
    userId: { type: String, required: true },
    rules: Object,
    name: { type: String, required: true },
    class: { type: Number, required: true },    
    health: String,
    description: String,
    version: { type: Number, required: true }, 
}, {
        timestamps: true
    });

export const ChampionModel = Mongoose.model<IChampion>('Champion', ChampionSchema);