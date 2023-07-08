import React from 'react';
import Feed from './feed.widget';
import NewPostForm from './new.post';

const FeedPage: React.FC = () => {
  return (
    <div>
      <h1>Feed Page</h1>
      <NewPostForm />
      <Feed />
    </div>
  );
};

export default FeedPage;