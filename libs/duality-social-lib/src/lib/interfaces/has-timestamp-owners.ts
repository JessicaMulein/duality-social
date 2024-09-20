import { IHasCreator } from './has-creator.ts';
import { IHasUpdater } from './has-updater.ts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IHasTimestampOwners extends IHasCreator, IHasUpdater {}
