import { Knex } from "knex";
import { Connector } from "@helpers/index.js";

export abstract class BaseModel {
    public tableName: string;
    public knexInstance: Knex;

    constructor (tableName: string, instanceName: string = 'default') {
        this.tableName = tableName;
        this.knexInstance = Connector.getInstance(instanceName);
    }

    public get knex(): Knex {
        return this.knexInstance;
    }
}