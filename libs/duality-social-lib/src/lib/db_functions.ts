
import { Schema, Model, model as mongooseModel } from 'mongoose';
import { IModelData } from './interfaces/modelData';
import { ModelNames } from './models/schema';
import { ModelData } from './models/modelData';
import mongooseGraphQLTransform from 'mongoose-graphql-transformer';

// not exported module level variables
/**
 * A map of schema names to their corresponding mongoose models
 * Objects are all Model<T> where T extends Document
 */
const modelMap: Map<string, object> = new Map();
/**
 * A map of schema names to their corresponding mongoose schemas
 */
const schemaMap: Map<string, Schema> = new Map();
const pathMap: Map<string, string> = new Map();
const modelDataMap: Map<string, ModelData> = new Map();
const graphQlMap: Map<string, object> = new Map();

export function registerModel<T>(modelData: IModelData): Model<T&Document> {
    const newModel = mongooseModel<T&Document>(modelData.name, modelData.schema, modelData.pluralName);
    const newModelData = new ModelData(modelData);
    modelDataMap.set(modelData.name, newModelData);
    modelMap.set(modelData.name, newModel);
    schemaMap.set(modelData.name, modelData.schema);
    pathMap.set(modelData.name, newModelData.path);
    graphQlMap.set(modelData.name, mongooseGraphQLTransform({
        class: 'GraphQLObjectType',
        description: modelData.description,
        name: modelData.name,
        schema: modelData.schema,
      }));
    return newModel;
}

export function findModelName<T>(model: Model<T>): string | undefined {
    for (const [key, value] of modelMap.entries()) {
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
export function modelToSchema<T>(model: Model<T>): Schema<T> {
    const modelName = findModelName(model);
    if (modelName === undefined) {
        throw new Error(`Could not find model ${model}`);
    }
    return nameToSchema<T>(modelName);
}

export function nameToModelData(modelName: ModelNames): ModelData {
    const modelNameString = modelName as string;
    if (modelDataMap.has(modelNameString)) {
        return modelDataMap.get(modelNameString) as ModelData;
    }
    throw new Error(`Could not locate model data for model ${modelNameString}`)
}

/**
 *  This function is used to get a model from a schema. It will create a new model if it doesn't exist
 *  The expectation is that this is called out of every model file, so that the model is registered
 * @param modelName 
 * @returns 
 */
export function nameToModel<T>(modelName: ModelNames): Model<T> {
    const modelNameString = modelName as string;
    const newModel = modelMap.get(modelNameString) as Model<T> | undefined;
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
export function nameToSchema<T>(modelName: ModelNames): Schema<T> {
    const modelNameString = modelName as string;
    const schema = schemaMap.get(modelNameString);
    if (!schema) {
        throw new Error(`Could not find model ${modelName}`);
    }
    return schema as Schema<T>;
}