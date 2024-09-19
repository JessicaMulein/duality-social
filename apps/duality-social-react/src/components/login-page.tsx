import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, FormikProps } from 'formik';
import * as Yup from 'yup';
import { isAxiosError } from 'axios';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  Paper,
  useTheme,
  Link as MuiLink,
} from '@mui/material';
import { AppConstants } from '@duality-social/duality-social-lib';
import { useAuth } from '../auth-provider.tsx';
import api from '../services/api.ts';

interface FormValues {
  email: string;
  username: string;
  password: string;
  loginType: 'email' | 'username';
}

function LoginPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [resendStatus, setResendStatus] = useState<string | null>(null);
  const [loginType, setLoginType] = useState<'email' | 'username'>('email');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard'); // Redirect to dashboard if user is already logged in
    }
  }, [isAuthenticated, navigate]);

  const initialValues: FormValues = {
    email: '',
    username: '',
    password: '',
    loginType: 'email',
  };

  const validationSchema = Yup.object({
    [loginType]:
      loginType === 'email'
        ? Yup.string().email('Invalid email address').required('Required')
        : Yup.string()
            .matches(
              AppConstants.UsernameRegex,
              AppConstants.UsernameRegexError
            )
            .required('Required'),
    password: Yup.string()
      .matches(AppConstants.PasswordRegex, AppConstants.PasswordRegexError)
      .required('Required'),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    try {
      await login(loginType === 'email' ? values.email : values.username, values.password, loginType === 'email');
      
      // Wait for a short time to ensure state is updated
      await new Promise(resolve => setTimeout(resolve, 100));
      
      resetForm();
      navigate('/dashboard');
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        setLoginError(error.response.data.message);
        if (
          error.response.data.message ===
          'Account status is PendingEmailVerification'
        ) {
          setResendStatus(null);
        }
      } else {
        setLoginError('An unexpected error occurred');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleResendVerification = async (identifier: string) => {
    try {
      await api.post('/user/resend-verification', {
        [loginType]: identifier,
      });
      setResendStatus('Verification email sent successfully');
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        setResendStatus(error.response.data.message);
      } else {
        setResendStatus('Failed to resend verification email');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, errors, touched }: FormikProps<FormValues>) => (
            <Form>
              <Field
                as={TextField}
                margin="normal"
                required
                fullWidth
                id={loginType}
                label={loginType === 'email' ? 'Email Address' : 'Username'}
                name={loginType}
                autoComplete={loginType === 'email' ? 'email' : 'username'}
                autoFocus
                error={touched[loginType] && Boolean(errors[loginType])}
                helperText={touched[loginType] && errors[loginType]}
              />
              <Field
                as={TextField}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              {loginError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {loginError}
                </Alert>
              )}
              {resendStatus && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  {resendStatus}
                </Alert>
              )}
              {loginError === 'Account status is PendingEmailVerification' && (
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 2 }}
                  onClick={() => handleResendVerification(values[loginType])}
                  disabled={isSubmitting || !values[loginType]}
                >
                  {isSubmitting ? 'Sending...' : 'Resend Verification Email'}
                </Button>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: theme.palette.primary.main }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </Form>
          )}
        </Formik>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <MuiLink
            component={Link}
            to="#"
            onClick={(e) => {
              e.preventDefault();
              setLoginType(loginType === 'email' ? 'username' : 'email');
            }}
            variant="body2"
          >
            Switch to {loginType === 'email' ? 'Username' : 'Email'} Login
          </MuiLink>
          <MuiLink component={Link} to="/forgot-password" variant="body2">
            Forgot Password?
          </MuiLink>
          <MuiLink component={Link} to="/register" variant="body2">
            Don't have an account? Register
          </MuiLink>
        </Box>
      </Paper>
    </Container>
  );
}

export default LoginPage;