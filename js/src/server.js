"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Hapi = require("hapi");
const Decks = require("./decks");
function init(configs, database) {
    return new Promise(resolve => {
        const port = process.env.PORT || configs.port;
        const server = new Hapi.Server();
        server.connection({
            port: port,
            routes: {
                cors: true
            }
        });
        if (configs.routePrefix) {
            server.realm.modifiers.route.prefix = configs.routePrefix;
        }
        console.log('All plugins registered successfully.');
        console.log('Register Routes');
        Decks.init(server, configs, database);
        console.log('Routes registered sucessfully.');
        resolve(server);
    });
}
exports.init = init;
//# sourceMappingURL=c:/Users/Desktop/Desktop/Typescript/Octagon/ccg/js/src/server.js.map