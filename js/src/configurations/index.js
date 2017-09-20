"use strict";
/*
import * as nconf from "nconf";
import * as path from "path";

//Read Configurations
const configs = new nconf.Provider({
  env: true,
  argv: true,
  store: {
    type: 'file',
    file: path.join(__dirname, `./config.${process.env.NODE_ENV || "dev"}.json`)
  }
});
*/
Object.defineProperty(exports, "__esModule", { value: true });
function getDatabaseConfig() {
    return { "connectionString": "mongodb://localhost:27017/taskdb-dev" };
}
exports.getDatabaseConfig = getDatabaseConfig;
function getServerConfigs() {
    return {
        "port": 5000,
        "routePrefix": "/api"
    };
}
exports.getServerConfigs = getServerConfigs;
//# sourceMappingURL=c:/Users/Desktop/Desktop/Typescript/Octagon/ccg/js/src/configurations/index.js.map