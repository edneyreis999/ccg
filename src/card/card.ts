import * as Mongoose from "mongoose";
import { IAvatarCardRules, IHeroCardRules } from './card-rules'
import { HeroClass, AvatarClass, EChampionFaction } from '../champion/champion-rules'

export interface ICard extends Mongoose.Document {
    userId: string;
    name: string;
    faction: EChampionFaction;
    factionDescription: string;
    class: HeroClass | AvatarClass;
    classDescription:string;
    version: number;
    rules: IAvatarCardRules | IHeroCardRules;
    description?: string;
    createdAt: Date;
    updateAt: Date;
}

export const CardSchema = new Mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    class: { type: Number, required: true },
    classDescription: {type: String},
    version: { type: Number, required: true },
    rules: { type: Object, required: true },
    faction: {type: Number, required: true},
    factionDescription: {type: String},
    description: String
}, {
        timestamps: true
    });

export const CardModel = Mongoose.model<ICard>('Card', CardSchema);