
// file: db_functions.ts
// description: This file contains helper functions that make use of the schema defined in ./schema.ts
// see also: ./schema.ts
// ---------------------------------------------------------------------------------------------------
import { Schema, Model, model } from 'mongoose';
import { IModelData } from './interfaces/modelData';
import { BaseModel } from './models/baseModel';
import { ModelNames } from './schema';
import { IHasID } from './interfaces/hasId';

export function registerModel<T extends IHasID>(modelData: IModelData): Model<T> {
    const newModel = model<T>(modelData.name, modelData.schema, modelData.apiName);
    const baseModel = new BaseModel<T>(modelData, newModel);
    return baseModel.Model;
}

export function findModelName<T extends IHasID>(model: Model<T>): string | undefined {
    for (const [key, value] of BaseModel.ModelRegistry.entries()) {
        if (value === model) {
            return key;
        }
    }
    return undefined;
}

/**
 * This function is used to get a schema from a model. It will create a new schema if it doesn't exist
 * @param model 
 * @returns 
 */
export function modelToSchema<T extends IHasID>(model: Model<T>): Schema<T> {
    const modelName = findModelName(model);
    if (modelName === undefined) {
        throw new Error(`Could not find model ${model}`);
    }
    return nameToSchema<T>(modelName);
}

export function nameToModelData(modelName: ModelNames): IModelData {
    const modelNameString = modelName as string;
    if (BaseModel.ModelDataMap.has(modelNameString)) {
        return BaseModel.ModelDataMap.get(modelNameString) as IModelData;
    }
    throw new Error(`Could not locate model data for model ${modelNameString}`)
}

/**
 *  This function is used to get a model from a schema. It will create a new model if it doesn't exist
 *  The expectation is that this is called out of every model file, so that the model is registered
 * @param modelName 
 * @returns 
 */
export function nameToModel<T extends IHasID>(modelName: ModelNames): Model<T> {
    const modelNameString = modelName as string;
    const newModel = BaseModel.ModelRegistry.get(modelNameString) as Model<T> | undefined;
    if (newModel) {
        return newModel;
    }
    throw new Error(`Could not find model ${modelNameString}`);
}

/**
 * This function is used to get a schema from a model. It will create a new schema if it doesn't exist
 * THe schema is expected to be registered via nameToModel
 * @param modelName 
 * @returns 
 */
export function nameToSchema<T extends IHasID>(modelName: ModelNames): Schema<T> {
    const modelNameString = modelName as string;
    const modelData = BaseModel.ModelDataMap.get(modelNameString);
    if (!modelData) {
        throw new Error(`Could not find model ${modelName}`);
    }
    return modelData.schema as Schema<T>;
}