// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import React from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

import RenderOnAnonymous from '../components/render.on.anonymous';
import RenderOnAuthenticated from '../components/render.on.authenticated';
import Welcome from '../components/welcome';
import FeedPage from '../components/feed/feed.page';

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
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/feed" element={<FeedPage />} />
          </Routes>
        </RenderOnAuthenticated>
      </div>
    </BrowserRouter>
  );
}

export default App;