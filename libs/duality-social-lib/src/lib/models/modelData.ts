import { Schema } from 'mongoose';
import { IModelData } from '../interfaces/modelData';

export class ModelData implements IModelData {
  public readonly name: string;
  public readonly description: string;
  public readonly apiName: string;
  public readonly pluralName: string;
  public readonly schema: Schema;
  public readonly path: string;
  constructor(modelData: IModelData) {
    this.name = modelData.name;
    this.description = modelData.description;
    this.apiName = modelData.apiName;
    this.pluralName = modelData.pluralName;
    this.schema = modelData.schema;
    // simply prefix the apiName with a slash
    this.path = '/'.concat(this.apiName);
  }
}
