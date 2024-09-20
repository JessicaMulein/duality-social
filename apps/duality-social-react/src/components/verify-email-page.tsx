import React, { useState, useEffect, memo, useRef } from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  CircularProgress,
  Button,
  Box,
  Alert,
} from '@mui/material';
import api from '../services/api.ts';

const VerifyEmailPage: React.FC = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<
    'pending' | 'success' | 'error'
  >('pending');

  const location = useLocation();

  const verificationRef = useRef(false);

  useEffect(() => {
    if (!verificationRef.current) {
      const query = new URLSearchParams(location.search);
      const tokenFromQuery = query.get('token');

      if (tokenFromQuery) {
        verificationRef.current = true;
        verifyEmail(tokenFromQuery);
      } else {
        setLoading(false);
        setMessage('No verification token provided.');
        setVerificationStatus('error');
      }
    }
  }, [location]);

  const verifyEmail = async (token: string) => {
    try {
      const response = await api.get(`/user/verify-email?token=${token}`);
      if (response.status === 200) {
        setMessage('Email verified successfully!');
        setVerificationStatus('success');
      } else {
        setMessage('Email verification failed. Please try again.');
        setVerificationStatus('error');
      }
    } catch (error) {
      setMessage(
        'An error occurred during email verification. Please try again.',
      );
      setVerificationStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Email Verification
        </Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Alert
              severity={verificationStatus === 'success' ? 'success' : 'error'}
              sx={{ mt: 2, mb: 2 }}
            >
              {message}
            </Alert>
            <Box mt={4} display="flex" justifyContent="center">
              {verificationStatus === 'success' ? (
                <Button
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/login"
                >
                  Proceed to Login
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/"
                >
                  Return to Home
                </Button>
              )}
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default memo(VerifyEmailPage);
