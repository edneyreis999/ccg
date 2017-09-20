import * as Mongoose from "mongoose";
import { IDataConfiguration } from "./configurations";
import { IDeck, DeckModel } from "./decks/deck";

export interface IDatabase {
    deckModel: Mongoose.Model<IDeck>;
}

export function init(config: IDataConfiguration): IDatabase {

    (<any>Mongoose).Promise = Promise;
    Mongoose.connect(process.env.MONGO_URL || config.connectionString);

    let mongoDb = Mongoose.connection;

    mongoDb.on('error', () => {
        console.log(`Unable to connect to database: ${config.connectionString}`);
    });

    mongoDb.once('open', () => {
        console.log(`Connected to database: ${config.connectionString}`);
    });

    return {
        deckModel: DeckModel
    };
}