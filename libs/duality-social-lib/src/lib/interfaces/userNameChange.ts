import { Document } from "mongoose"

export interface IUsernameChange extends Document {
    oldName: string
    newName: string
    createdAt: Date
    createdBy: string
}