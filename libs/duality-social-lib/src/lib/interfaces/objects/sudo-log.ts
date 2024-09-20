import { IHasId } from '../has-id';
import { ISudoLog } from '../models/sudo-log';

export interface ISudoLogObject extends ISudoLog, IHasId {}
