"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
const collection_1 = require("./collections/collection");
function init(config) {
    Mongoose.Promise = Promise;
    Mongoose.connect(process.env.MONGO_URL || config.connectionString);
    let mongoDb = Mongoose.connection;
    mongoDb.on('error', () => {
        console.log(`Unable to connect to database: ${config.connectionString}`);
    });
    mongoDb.once('open', () => {
        console.log(`Connected to database: ${config.connectionString}`);
    });
    return {
        collectionModel: collection_1.CollectionModel
    };
}
exports.init = init;
//# sourceMappingURL=c:/Users/Desktop/Desktop/Typescript/Octagon/ccg/js/src/database.js.map