import { IFeedPost } from '@duality-social/duality-social-lib';
import { CircularProgress, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import authenticatedApi from '../services/authenticated-api';
import { getToken, verifyToken } from '../utils/auth.ts';
import Post from './post';

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<IFeedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = getToken();
      if (token && verifyToken(token)) {
        try {
          const response = await authenticatedApi.get('/feed', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setPosts(response.data.posts);
        } catch (err) {
          setError('Failed to fetch posts');
        } finally {
          setIsLoading(false);
        }
      } else {
        setError('Not authenticated');
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="md">
      {posts && posts.length > 0 ? (
        posts.map((post) => <Post key={post.id?.toString()} post={post} />)
      ) : (
        <Typography textAlign="center">No posts to display</Typography>
      )}
    </Container>
  );
};

export default Feed;
