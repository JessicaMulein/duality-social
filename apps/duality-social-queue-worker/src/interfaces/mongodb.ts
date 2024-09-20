import { ISchemaModels } from "@duality-social/duality-social-lib";
import { Mongoose } from "mongoose";

export interface IMongoDb {
    db: Mongoose, schema: ISchemaModels
}