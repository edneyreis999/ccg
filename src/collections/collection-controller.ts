import * as Hapi from "hapi";
import { ICollection } from "./collection";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";

export default class CollectionController {

    private database: IDatabase;
    private configs: IServerConfigurations;

    constructor(configs: IServerConfigurations, database: IDatabase) {
        this.configs = configs;
        this.database = database;
    }

    public async createCollection(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {        
        return reply("createCollection");
    }

    public async updateCollection(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {       
        return reply("updateCollection");
    }

    public async deleteCollection(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {       
        return reply("deleteCollection");
    }

    public async getCollectionById(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {       
        let id = request.params["id"];
        reply("getCollectionById id = "+id);
    }

    public async getCollections(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {       
        reply("getCollections");
    }
}