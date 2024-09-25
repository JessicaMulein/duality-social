import { IHasCreator } from './has-creator.ts';
import { IHasUpdater } from './has-updater.ts';

export interface IHasTimestampOwners extends IHasCreator, IHasUpdater {}
