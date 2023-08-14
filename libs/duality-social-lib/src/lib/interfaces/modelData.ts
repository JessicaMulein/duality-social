import { Schema } from "mongoose";
import ModelName from "../enumerations/modelName";

export interface IModelData {
    readonly name: ModelName;
    readonly description: string;
    readonly apiName: string;
    readonly pluralName: string;
    readonly schema: Schema;
    readonly path: string;
  }