import * as Mongoose from "mongoose";
import { IDataConfiguration } from "./configurations";
import { ICollection, CollectionModel } from "./collections/collection";

export interface IDatabase {
    collectionModel: Mongoose.Model<ICollection>;
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
        collectionModel: CollectionModel
    };
}