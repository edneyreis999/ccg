/*
import * as hapi from "hapi";

const server: hapi.Server = new hapi.Server()
server.connection({ port: 3000 });

server.route({
    method: "GET",
    path: "/",
    handler: (request: hapi.Request, reply: hapi.ReplyNoContinue) => {
        console.log("vou tentar debugar aqui");
        reply("Acho que vai dar certo!");
    }

});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log("server running at 3000");
})
*/
import * as Server from "./server";
import * as Database from "./database";
import * as Configs from "./configurations";
console.log(`Running enviroment ${process.env.NODE_ENV || "dev"}`);

// Catch unhandling unexpected exceptions
process.on('uncaughtException', (error: Error) => {
    console.error(`uncaughtException ${error.message}`);
});

// Catch unhandling rejected promises
process.on('unhandledRejection', (reason: any) => {
    console.error(`unhandledRejection ${reason}`);
});

// Init Database
const dbConfigs = Configs.getDatabaseConfig();
const database = Database.init(dbConfigs);

// Starting Application Server
const serverConfigs = Configs.getServerConfigs();

Server.init(serverConfigs, database).then((server) => {
    server.start(() => {
        console.log('Server running at:', server.info.uri);
    });
});