import * as Mongoose from "mongoose";
import { IAvatarCardRules, IHeroCardRules } from './card-rules'
import { HeroClass, AvatarClass } from '../champion/champion-rules'

export interface ICard extends Mongoose.Document {
    userId: string;
    name: string;
    class: HeroClass | AvatarClass;
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
    version: { type: Number, required: true },
    rules: { type: Object, required: true },
    description: String
}, {
        timestamps: true
    });

export const CardModel = Mongoose.model<ICard>('Card', CardSchema);