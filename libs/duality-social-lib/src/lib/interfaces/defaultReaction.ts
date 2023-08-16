import { IconName } from '@fortawesome/fontawesome-common-types';
import { DefaultReactionsTypeEnum } from '../enumerations/defaultReactionsType';

export interface IDefaultReaction {
    reaction: DefaultReactionsTypeEnum;
    icon: IconName;
}