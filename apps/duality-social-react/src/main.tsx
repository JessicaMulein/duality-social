import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { all } from '@awesome.me/kit-89ec609b07/icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

import App from './app/app';
import { AuthProvider } from './auth-provider';

// fontawesome
library.add(...all);
config.autoAddCss = false;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
