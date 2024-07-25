import React, { useState } from 'react';
import { IFeedPost, IFeedViewpoint } from '@duality-social/duality-social-lib';
import PostViewpoint from './PostViewpoint';

interface PostProps {
  post: IFeedPost;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const { inputViewpoint, aiViewpoint } = post;

  const getSortedViewpoints = () => {
    if (inputViewpoint.rank === undefined && aiViewpoint.rank === undefined) {
      return [inputViewpoint, aiViewpoint].sort(() => Math.random() - 0.5);
    } else {
      return [inputViewpoint, aiViewpoint].sort((a, b) => (a.rank ?? Infinity) - (b.rank ?? Infinity));
    }
  };

  const [viewpoints, setViewpoints] = useState<IFeedViewpoint[]>(getSortedViewpoints());
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => setCollapsed(!collapsed);

  return (
    <div className="post">
      <div className="viewpoints">
        {viewpoints.map((viewpoint, index) => (
          <PostViewpoint key={index} viewpoint={viewpoint} />
        ))}
      </div>
      <button onClick={toggleCollapse}>
        {collapsed ? 'Expand' : 'Collapse'}
      </button>
    </div>
  );
};

export default Post;