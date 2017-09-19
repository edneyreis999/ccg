"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hapi = require("hapi");
const server = new hapi.Server();
server.connection({ port: 3000 });
server.route({
    method: "GET",
    path: "/",
    handler: (request, reply) => {
        console.log("vou tentar debugar aqui");
        reply("Hello ee!");
    }
});
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log("server running at 3000");
});
//# sourceMappingURL=c:/Users/Desktop/Desktop/Typescript/Octagon/typescript-node-basic/js/src/index.js.map