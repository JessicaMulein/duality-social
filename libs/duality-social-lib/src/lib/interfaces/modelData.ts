import { Schema } from "mongoose";

export interface IModelData {
    readonly name: string;
    readonly description: string;
    readonly apiName: string;
    readonly pluralName: string;
    readonly schema: Schema;
  }