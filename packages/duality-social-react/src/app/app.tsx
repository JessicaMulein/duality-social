// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import React from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

import { isAdmin } from '../services/user.service';
import RenderOnAnonymous from '../components/render.on.anonymous';
import RenderOnAuthenticated from '../components/render.on.authenticated';
import Welcome from '../components/welcome';
import AdminDashboard from '../components/admin/admin.dashboard';
import FeedPage from '../components/feed/feed.page';
import NotAllowed from '../components/not.allowed';

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
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<FeedPage />} />
          </Routes>
        </RenderOnAuthenticated>
      </div>
    </BrowserRouter>
  );
}

export default App;