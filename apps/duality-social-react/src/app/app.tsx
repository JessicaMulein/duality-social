import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import ChangePasswordPage from '../components/change-password-page.tsx';
import DashboardPage from '../components/dashboard-page.tsx';
import ForgotPasswordPage from '../components/forgot-password-page.tsx';
import FormatGuide from '../components/format-guide.tsx';
import LoginPage from '../components/login-page.tsx';
import PrivateRoute from '../components/private-route.tsx';
import RegisterPage from '../components/register-page.tsx';
import SplashPage from '../components/splash-page.tsx';
import TopMenu from '../components/top-menu.tsx';
import UserProfilePage from '../components/user-profile-page.tsx';
import VerifyEmailPage from '../components/verify-email-page.tsx';
import { MenuProvider } from '../menu-context.tsx';
import theme from '../theme.tsx';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
        <MenuProvider>
          <TopMenu />
          <Box
            sx={{
              paddingTop: (theme) => `${theme.mixins.toolbar.minHeight}px`,
            }}
          >
            <Routes>
              <Route path="/" element={<SplashPage />} />
              <Route
                path="/change-password"
                element={
                  <PrivateRoute>
                    <ChangePasswordPage />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                }
              />
              <Route path="/verify-email" element={<VerifyEmailPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route
                path="/profile/:username"
                element={
                  <PrivateRoute>
                    <UserProfilePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/help/post-format"
                element={
                  <PrivateRoute>
                    <FormatGuide />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Box>
        </MenuProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
