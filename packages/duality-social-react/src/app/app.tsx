// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import React from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

import RenderOnAnonymous from '../components/render.on.anonymous';
import RenderOnAuthenticated from '../components/render.on.authenticated';
import Welcome from '../components/welcome';
import FeedPage from '../components/feed/feed.page';
import LoginPage from '../components/login/login.page';

export function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <RenderOnAnonymous>
          <Welcome />
        </RenderOnAnonymous>
        <RenderOnAuthenticated>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
                <Link to="/feed">Feed</Link>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
        </RenderOnAuthenticated>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/feed" element={<FeedPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;