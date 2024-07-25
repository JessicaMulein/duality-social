import React, { useState, useEffect } from 'react';
import styles from './app.module.scss';
import LoginLink from '../components/LoginLink';
import UserProfile from '../components/UserProfile';
import { Route, Routes, Link } from 'react-router-dom';
import { getToken, verifyToken } from '../utils/auth';
import LoginPage from '../components/LoginPage';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token && verifyToken(token)) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div>
      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
          {!isAuthenticated && (
            <li>
              <LoginLink />
            </li>
          )}
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/profile"
          element={
            <div>
              <UserProfile />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div>
              <LoginPage />
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
