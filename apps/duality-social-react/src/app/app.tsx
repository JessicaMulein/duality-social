// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useAuth0 } from '@auth0/auth0-react';
import styles from './app.module.scss';
import LoginLink from '../components/LoginLink';
import UserProfile from '../components/UserProfile';

import { Route, Routes, Link } from 'react-router-dom';

export function App() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
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
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
