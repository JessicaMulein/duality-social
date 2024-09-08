import { DefaultReactionsTypeEnum } from '@duality-social/duality-social-lib';
import { faFaceAngry, faFaceKissWinkHeart, faPartyHorn, faFaceSmilingHands, faFaceConfused, faFaceLaugh, faThumbsUp, faHeart, faFaceSadTear, faFaceHushed, faFaceDizzy } from '@awesome.me/kit-89ec609b07/icons/classic/regular';
import { IconDefinition } from '@awesome.me/kit-89ec609b07/icons';

export const reactionEmojis: { [type in DefaultReactionsTypeEnum]: string } = {
  [DefaultReactionsTypeEnum.Angry]: '😡',
  [DefaultReactionsTypeEnum.Care]: '🤗',
  [DefaultReactionsTypeEnum.Celebrate]: '🎉',
  [DefaultReactionsTypeEnum.Hug]: '🤗',
  [DefaultReactionsTypeEnum.Huh]: '🤔',
  [DefaultReactionsTypeEnum.Laugh]: '😂',
  [DefaultReactionsTypeEnum.Like]: '👍',
  [DefaultReactionsTypeEnum.Love]: '❤️',
  [DefaultReactionsTypeEnum.Sad]: '😢',
  [DefaultReactionsTypeEnum.Wow]: '😮',
  [DefaultReactionsTypeEnum.Yuck]: '🤮'
};

export const reactionFontAwesomeIcons: { [type in DefaultReactionsTypeEnum]: IconDefinition } = {
  [DefaultReactionsTypeEnum.Angry]: faFaceAngry,
  [DefaultReactionsTypeEnum.Care]: faFaceKissWinkHeart,
  [DefaultReactionsTypeEnum.Celebrate]: faPartyHorn,
  [DefaultReactionsTypeEnum.Hug]: faFaceSmilingHands,
  [DefaultReactionsTypeEnum.Huh]: faFaceConfused,
  [DefaultReactionsTypeEnum.Laugh]: faFaceLaugh,
  [DefaultReactionsTypeEnum.Like]: faThumbsUp,
  [DefaultReactionsTypeEnum.Love]: faHeart,
  [DefaultReactionsTypeEnum.Sad]: faFaceSadTear,
  [DefaultReactionsTypeEnum.Wow]: faFaceHushed,
  [DefaultReactionsTypeEnum.Yuck]: faFaceDizzy
};