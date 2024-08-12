import knex, {Knex} from "knex";
export class Connector {
    private static instance: {[key: string]: Knex} = {};
    public static connect (config: Knex.Config, instanceName: string = 'default'): Knex {
        if (Connector.instance[instanceName]) {
            Connector.instance[instanceName] = knex(config);
        }
        return Connector.getInstance(instanceName);
    }

    public static getInstance(instanceName: string = 'default'): Knex {
        return Connector.instance[instanceName];
    }

    public static parseURL(inputURL: string): Knex.Config {
        const url = new URL(inputURL);
        return {
            client: url.protocol.replace(/[:]/gi,''),
            connection: {
                host: url.hostname,
                port: parseInt(url.port) ?? 5432,
                user: url.username,
                password: url.password,
                database: url.pathname.replace(/[/\s]/gi, '')
            }
        }
    }

    public static connectByURL (connectionString: string, instanceName: string = 'default'): Knex {
        return Connector.connect(Connector.parseURL(connectionString), instanceName);
    }
}