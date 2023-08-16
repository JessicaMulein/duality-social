export interface IPostMeta {
    expands: number,
    impressions: number,
    reactions: number,
    reactionsByType: { [key: string]: number };
}