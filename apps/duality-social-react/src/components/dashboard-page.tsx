import React, { useEffect, useState, memo } from 'react';
import { useAuth } from '../auth-provider';
import {
  Box,
  Container,
  Paper,
  Typography,
  CircularProgress,
  useTheme,
} from '@mui/material';
import Feed from './feed.tsx';
import NewPost from './new-post.tsx';

const DashboardPage: React.FC = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor={theme.palette.background.default}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" flexDirection="column" gap={3}>
        {/* Welcome Message */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h4" color="primary" gutterBottom>
            Welcome to Your Dashboard, {user?.username || 'User'}
          </Typography>
        </Paper>

        <Box display="flex" flexDirection="column" gap={3}>
          <Paper sx={{ p: 2 }}>
            <NewPost isBlogPost={false} />
          </Paper>
        </Box>

        {/* Main content area */}
        <Box display="flex" gap={3} flexDirection={{ xs: 'column', md: 'row' }}>
          <Paper sx={{ p: 2, flex: 1 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Your Feed
            </Typography>
            <Feed />
          </Paper>
        </Box>

        {/* User Statistics */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" color="primary" gutterBottom>
            Your Statistics
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={2}>
            {[
              'Total Posts',
              'Total Comments',
              'Likes Received',
              'Days Active',
            ].map((stat, index) => (
              <Box key={index} flex="1 1 calc(25% - 16px)" minWidth="120px">
                <Typography variant="h4">
                  {Math.floor(Math.random() * 100)}
                </Typography>
                <Typography color="text.secondary">{stat}</Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default memo(DashboardPage);
