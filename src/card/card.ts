import * as Mongoose from "mongoose";
import { IAvatarCardRules, IHeroCardRules } from './card-rules'

export interface ICard extends Mongoose.Document {
    userId: string;
    rules: IAvatarCardRules | IHeroCardRules;
    description?: string;
    version: string;
    createdAt: Date;
    updateAt: Date;
}

export const CardSchema = new Mongoose.Schema({
    userId: { type: String, required: true },
    rules: { type: Object, required: true },
    description: String,
    version: String
}, {
        timestamps: true
    });

export const CardModel = Mongoose.model<ICard>('Card', CardSchema);