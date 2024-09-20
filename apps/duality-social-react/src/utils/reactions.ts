import { DefaultReactionsTypeEnum, DefaultReactionsEmoji } from '@duality-social/duality-social-lib';
import { faFaceAngry, faHandsHoldingHeart, faPartyHorn, faFaceSmilingHands, faFaceConfused, faFaceLaugh, faThumbsUp, faHeart, faFaceSadTear, faFaceHushed, faFaceDizzy } from '@awesome.me/kit-89ec609b07/icons/classic/regular';
import { IconDefinition } from '@awesome.me/kit-89ec609b07/icons';

export const reactionEmojis: { [type in DefaultReactionsTypeEnum]: string } = {
  [DefaultReactionsTypeEnum.Angry]: DefaultReactionsEmoji.Angry,
  [DefaultReactionsTypeEnum.Care]: DefaultReactionsEmoji.Care,
  [DefaultReactionsTypeEnum.Celebrate]: DefaultReactionsEmoji.Celebrate,
  [DefaultReactionsTypeEnum.Hug]: DefaultReactionsEmoji.Hug,
  [DefaultReactionsTypeEnum['Huh?']]: DefaultReactionsEmoji['Huh?'],
  [DefaultReactionsTypeEnum.Laugh]: DefaultReactionsEmoji.Laugh,
  [DefaultReactionsTypeEnum.Like]: DefaultReactionsEmoji.Like,
  [DefaultReactionsTypeEnum.Love]: DefaultReactionsEmoji.Love,
  [DefaultReactionsTypeEnum.Sad]: DefaultReactionsEmoji.Sad,
  [DefaultReactionsTypeEnum.Wow]: DefaultReactionsEmoji.Wow,
  [DefaultReactionsTypeEnum.Yuck]: DefaultReactionsEmoji.Yuck
};

export const reactionFontAwesomeIcons: { [type in DefaultReactionsTypeEnum]: IconDefinition } = {
  [DefaultReactionsTypeEnum.Angry]: faFaceAngry,
  [DefaultReactionsTypeEnum.Care]: faHandsHoldingHeart,
  [DefaultReactionsTypeEnum.Celebrate]: faPartyHorn,
  [DefaultReactionsTypeEnum.Hug]: faFaceSmilingHands,
  [DefaultReactionsTypeEnum['Huh?']]: faFaceConfused,
  [DefaultReactionsTypeEnum.Laugh]: faFaceLaugh,
  [DefaultReactionsTypeEnum.Like]: faThumbsUp,
  [DefaultReactionsTypeEnum.Love]: faHeart,
  [DefaultReactionsTypeEnum.Sad]: faFaceSadTear,
  [DefaultReactionsTypeEnum.Wow]: faFaceHushed,
  [DefaultReactionsTypeEnum.Yuck]: faFaceDizzy
};