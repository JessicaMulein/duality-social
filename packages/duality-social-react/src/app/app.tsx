// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import RenderOnAnonymous from '../components/render.on.anonymous';
import RenderOnAuthenticated from '../components/render.on.authenticated';
import Welcome from '../components/welcome';
import Test from '../test/test';

export function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <RenderOnAnonymous>
          <Welcome/>
        </RenderOnAnonymous>
        <RenderOnAuthenticated>
          <Test />
        </RenderOnAuthenticated>
      </div>
    </BrowserRouter>
  );
}

export default App;
