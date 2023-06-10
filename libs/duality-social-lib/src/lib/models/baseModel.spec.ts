/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Model, model, Schema } from 'mongoose';
import { BaseModel } from './baseModel';
import { ModelData } from './modelData';
import { registerModel } from '../db_functions';

describe('BaseModel', () => {
    it('should be able to create a new model', () => {
        const modelName = 'test;'
        const schema = new Schema();
        const NewModel = model(modelName, schema);
        const newModel = new BaseModel<any>(new ModelData({
            name: modelName,
            description: 'test',
            apiName: 'test',
            pluralName: 'tests',
            schema: schema
        }), NewModel);
        expect(newModel).toBeDefined();
        expect(newModel.Model).toBeTruthy();
        const retrievedModel = BaseModel.getModel(modelName);
        expect(retrievedModel).toBe(newModel.Model);
        expect(retrievedModel.modelName).toBe(modelName);
    });
    it('should not allow the same model to be added twice', () => {
        const schema1 = new Schema();
        const schema2 = new Schema();
        const newModel1 = registerModel<BaseModel<any>>(new ModelData({
            name: 'test1',
            description: 'test1',
            apiName: 'test1',
            pluralName: 'test1s',
            schema: schema1
        }));
        const newModel2 = registerModel<BaseModel<any>>(new ModelData({
            name: 'test2',
            description: 'test2',
            apiName: 'test2',
            pluralName: 'test2s',
            schema: schema2
        }));
        const schema3 = new Schema();
        expect(() => registerModel<BaseModel<any>>(new ModelData({
            name: 'test1',
            description: 'test1 duplicate',
            apiName: 'test1',
            pluralName: 'test1s',
            schema: schema3
        }))).toThrowError('Cannot overwrite `test1` model once compiled.');
    });
});