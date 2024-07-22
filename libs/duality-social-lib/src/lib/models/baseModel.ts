import {
  Document,
  model,
  Model,
  Schema,
} from 'mongoose';
import { IModelData } from '../interfaces/modelData';
import ModelName from '../enumerations/modelName';

abstract class Base {
  protected static readonly ModelRegistry: Map<string, Model<any>> = new Map<
    string,
    Model<any>>();
  constructor(model: Model<any>) {
    if (!model || !model.modelName) {
      return;
    }
    if (Base.ModelRegistry.has(model.modelName)) {
      console.warn(`Model ${model.modelName} already exists. Reusing the existing model.`);
      return;
    }
    Base.ModelRegistry.set(model.modelName, model);
  }
  public static getModel<T>(model: ModelName): Model<T> {
    if (!Base.ModelRegistry.has(model)) {
      throw new Error(`Model ${model} does not exist`);
    }
    return Base.ModelRegistry.get(model) as unknown as Model<T>;
  }
}

export class BaseModel<
  T extends Document,
  U = Schema.Types.ObjectId
> extends Base {
  protected static ModelDataMap: Map<string, IModelData> = new Map<
    string,
    IModelData>();
  public readonly Name: ModelName;
  public readonly Path: string;
  public readonly Schema: Schema;
  public readonly Collection?: string;
  public readonly Model: Model<T>;
  constructor(
    modelData: IModelData,
    model: Model<T>,
  ) {
    super(model);
    this.Name = modelData.name;
    this.Path = modelData.path;
    this.Schema = modelData.schema;
    this.Collection = modelData.collection;
    this.Model = model;
    if (!BaseModel.ModelDataMap.has(modelData.name)) {
      BaseModel.ModelDataMap.set(modelData.name, modelData);
    }
  }
  static create<T extends Document>(modelData: IModelData): BaseModel<T> {
    const modelInstance = model<T>(modelData.name, modelData.schema, modelData.collection);
    const baseModel = new BaseModel<T>(modelData, modelInstance);
    return baseModel;
  }
  static getModelData(model: ModelName): IModelData {
    if (!BaseModel.ModelDataMap.has(model)) {
      throw new Error(`Model ${model} does not exist`);
    }
    return BaseModel.ModelDataMap.get(model) as IModelData;
  }
}
