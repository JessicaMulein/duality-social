import { Document, Model, Schema } from "mongoose";
import { IHasID } from "../interfaces/hasId";
import { BaseModel } from "./baseModel";
import { IModelData } from "../interfaces/modelData";
import { ModelData } from "./modelData";

export class BaseModelCache<T extends IHasID, U = Schema.Types.ObjectId> extends BaseModel<T,U> {
    public readonly _cache: Map<U, T&Document> = new Map<U, T&Document>();
    constructor(modelData: IModelData, model: Model<T&Document>) {
        super(new ModelData(modelData), model);
    }
    static make<T extends IHasID>(modelData: IModelData, model: Model<T&Document>) {
        return new BaseModelCache(modelData, model);
    }
    protected get(id: U): T&Document | undefined {
        return this._cache.has(id) ? this._cache.get(id) : undefined;
    }
    protected has(id: U): boolean {
        return this._cache.has(id);
    }
    protected set(doc: T&Document): void {
        if (doc._id === undefined) {
            throw new Error("model have id set")
        }
        this._cache.set(doc._id, doc);
    }
}