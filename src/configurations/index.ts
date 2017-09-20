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

export interface IServerConfigurations {
    port: number;
    //plugins: Array<string>;
    //jwtSecret: string;
    //jwtExpiration: string;
    routePrefix: string;
}

export interface IDataConfiguration {
    connectionString: string;
}

export function getDatabaseConfig(): IDataConfiguration {
    return { "connectionString": "mongodb://localhost:27017/taskdb-dev" };
}

export function getServerConfigs(): IServerConfigurations {
    return {
        "port": 5000,
        "routePrefix": "/api"
    }
}