import bodyParser from 'body-parser';
import { Application } from "express";

export function addBodyParser(app: Application) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
}