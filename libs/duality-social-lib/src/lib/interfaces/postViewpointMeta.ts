export interface IPostViewpointMeta {
    expands: number;
    impressions: number;
    reactions:  number;
    reactionsByType: { [key: string]: number };
  }