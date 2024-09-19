import { IHasCreation } from "./has-creation.ts";

export interface IHasTimestamps extends IHasCreation
{
    createdAt: Date;
    updatedAt: Date;
}