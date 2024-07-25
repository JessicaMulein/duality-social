import React from 'react';
import { reactionEmojis } from '../utils/reactions';
import { IFeedViewpoint, DefaultReactionsTypeEnum } from '@duality-social/duality-social-lib';

interface PostViewpointProps {
  viewpoint: IFeedViewpoint;
}

const PostViewpoint: React.FC<PostViewpointProps> = ({ viewpoint }) => {
  return (
    <div className="viewpoint">
      <p>{viewpoint.content}</p>
      <div className="reactions">
        {Object.entries(viewpoint.reactions).map(([type, count]) => (
          <span key={type}>
            {reactionEmojis[type as DefaultReactionsTypeEnum] || type}: {count}
          </span>
        ))}
      </div>
      <div className="replies">
        Replies: {viewpoint.repliesCount}
      </div>
    </div>
  );
};

export default PostViewpoint;