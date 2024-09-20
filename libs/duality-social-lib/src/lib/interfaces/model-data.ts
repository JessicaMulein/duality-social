import { Schema } from "mongoose";
import ModelName from "../enumerations/model-name.ts";
import ModelNameCollection from "../enumerations/model-name-collection.ts";

export interface IModelData {
    readonly name: ModelName;
    readonly description: string;
    readonly collection: ModelNameCollection;
    readonly schema: Schema;
    readonly path: string;
  }