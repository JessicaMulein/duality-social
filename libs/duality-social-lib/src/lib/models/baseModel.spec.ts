/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { model, Model, Schema } from 'mongoose';
import { BaseModel } from './baseModel';
import ModelName from '../enumerations/modelName';
import ModelNameCollection from '../enumerations/modelNameCollection';
import { IUser } from '../interfaces/user';

describe('BaseModel', () => {
    it('should be able to create a new model', () => {
        const modelName: ModelName = ModelName.User;
        const schema = new Schema();
        const newModel = BaseModel.create<IUser>({
            name: modelName,
            description: 'test',
            collection: ModelNameCollection.User,
            schema: schema,
            path: `/${ModelNameCollection.User}}`
        });
        expect(newModel).toBeDefined();
        expect(newModel.Model).toBeTruthy();
        const retrievedModel = BaseModel.getModel(modelName);
        expect(retrievedModel).toBe(newModel.Model);
        expect(retrievedModel.modelName).toBe(modelName);
    });
});