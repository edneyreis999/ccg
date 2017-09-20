import * as Mongoose from "mongoose";
import { IAvatarDeckRules, IHeroDeckRules } from './deck-rules'

export interface IDeck extends Mongoose.Document {
  userId: string;
  rules: IAvatarDeckRules | IHeroDeckRules;
  name: string;
  description: string;
  createdAt: Date;
  updateAt: Date;
}

export const DeckSchema = new Mongoose.Schema({
  userId: { type: String, required: true },
  rules: { type: Object, required: true },
  name: { type: String, required: true },
  description: String,
  completed: Boolean
}, {
    timestamps: true
  });

export const DeckModel = Mongoose.model<IDeck>('Deck', DeckSchema);