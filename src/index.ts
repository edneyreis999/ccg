import * as hapi from "hapi";

const server: hapi.Server = new hapi.Server()
server.connection({ port: 3000 });

server.route({
    method: "GET",
    path: "/",
    handler: (request: hapi.Request, reply: hapi.ReplyNoContinue) => {
        console.log("vou tentar debugar aqui");
        reply("Agora falta configurar pra rodar no vscode!");
    }

});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log("server running at 3000");
})