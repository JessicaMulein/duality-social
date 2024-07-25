import { DefaultReactionsTypeEnum } from '@duality-social/duality-social-lib';

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