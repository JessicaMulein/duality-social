import {
  Model,
  Schema,
} from 'mongoose';
import { IHasID } from '../interfaces/hasId';
import { IModelData } from '../interfaces/modelData';
import ModelName from '../enumerations/modelName';

abstract class Base {
  public static readonly ModelRegistry: Map<string, Model<unknown>> = new Map<
    string,
    Model<unknown>>();
  constructor(model: Model<unknown>) {
    if (!model || !model.modelName) {
      return;
    }
    if (BaseModel.ModelRegistry.has(model.modelName)) {
      throw new Error(`Model ${model.modelName} already exists`);
    }
    BaseModel.ModelRegistry.set(model.modelName, model);
  }
  public static getModel<T>(model: ModelName): Model<T> {
    if (!BaseModel.ModelRegistry.has(model)) {
      throw new Error(`Model ${model} does not exist`);
    }
    return BaseModel.ModelRegistry.get(model) as Model<T>;
  }

  public static getModels(): Model<unknown>[] {
    const models: Model<unknown>[] = [];
    for (const model of BaseModel.ModelRegistry.values()) {
      models.push(model);
    }
    return models;
  }
}

export class BaseModel<
  T extends IHasID<U>,
  U = Schema.Types.ObjectId
> extends Base {
  public static ModelDataMap: Map<string, IModelData> = new Map<
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
    super(model as Model<unknown>);
    this.Name = modelData.name;
    this.Path = modelData.path;
    this.Schema = modelData.schema;
    this.Collection = modelData.pluralName;
    this.Model = model;
    BaseModel.ModelDataMap.set(modelData.name, modelData);
  }
  public getModel(): Model<T> {
    return Base.getModel<T>(this.Name);
  }
}
