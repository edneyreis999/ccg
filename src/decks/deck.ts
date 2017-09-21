import * as Mongoose from "mongoose";
import { IAvatarDeckRules, IHeroDeckRules, DeckType } from './deck-rules'

export interface IDeck extends Mongoose.Document {
  userId: string;
  type: DeckType;
  rules: IAvatarDeckRules | IHeroDeckRules;
  name: string;
  description: string;
  createdAt: Date;
  updateAt: Date;
}
export interface IDeckPayload{
  type:DeckType;
  info:IDeck;
}

export const DeckSchema = new Mongoose.Schema({
  userId: { type: String, required: true },
  rules: { type: Object, required: true },
  name: { type: String, required: true },
  type: { type: Number, required: true },
  description: String,
  completed: Boolean
}, {
    timestamps: true
  });

export const DeckModel = Mongoose.model<IDeck>('Deck', DeckSchema);