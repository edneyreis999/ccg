import * as Mongoose from "mongoose";

export interface ICollection extends Mongoose.Document {
  userId: string;
  name: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updateAt: Date;
}

export const CollectionSchema = new Mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: String,
  completed: Boolean
}, {
    timestamps: true
  });

export const CollectionModel = Mongoose.model<ICollection>('Collection', CollectionSchema);