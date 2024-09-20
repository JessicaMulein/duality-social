import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Container,
  useTheme,
} from '@mui/material';

const SplashPage: React.FC = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: 4,
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <img
            src="/assets/DualitySocial.png"
            alt="DualitySocial Logo"
            style={{ width: 150 }}
          />
        </Box>
        <Typography
          variant="h1"
          sx={{ mb: 2, color: theme.palette.primary.main }}
        >
          Discover{' '}
          <span style={{ fontFamily: 'Electric Shocker, Arial, sans-serif' }}>
            Duality
          </span>
          <span style={{ fontFamily: 'Eurostile Extended, Arial, sans-serif' }}>
            {' '}
            Social
          </span>
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 6,
            maxWidth: 800,
            mx: 'auto',
            color: theme.palette.primary.main,
          }}
        >
          Embrace the power of perspective. Challenge your thoughts. Expand your
          mind.
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            mb: 6,
            justifyContent: 'center',
          }}
        >
          {[
            {
              title: 'AI-Powered Insights',
              description:
                'Experience the thrill of AI-generated counterpoints that challenge and expand your worldview.',
            },
            {
              title: 'Dynamic Dialogues',
              description:
                'Engage in rich, multifaceted conversations that bridge human intuition and artificial intelligence.',
            },
            {
              title: 'Perception Challenge',
              description:
                'Put your intuition to the test. Can you distinguish between human and AI-generated perspectives?',
            },
          ].map((feature, index) => (
            <Box
              key={index}
              sx={{ flex: '1 1 300px', maxWidth: 'calc(33.333% - 16px)' }}
            >
              <Card
                sx={{ height: '100%', bgcolor: theme.palette.background.paper }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{ mb: 2, color: theme.palette.primary.main }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        <Box sx={{ mb: 4 }}>
          <Button
            component={RouterLink}
            to="/register"
            variant="contained"
            color="primary"
            sx={{ mr: 2 }}
          >
            Join the Experiment
          </Button>
          <Button
            component={RouterLink}
            to="/login"
            variant="outlined"
            color="primary"
          >
            Welcome Back
          </Button>
        </Box>

        <Typography
          variant="body2"
          sx={{ color: theme.palette.text.secondary }}
        >
          &copy; 2024 DualitySocial. Redefining social interaction.
        </Typography>
      </Container>
    </Box>
  );
};

export default SplashPage;
