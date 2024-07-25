export interface IFeedViewpoint {
    rank?: number;
    content: string;
    reactions: {
      [type: string]: number;
    };
    repliesCount: number;
  }