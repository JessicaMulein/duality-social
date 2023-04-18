import { StrictMode, useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import keycloak from './keycloak';
import App from './app/app';
import Test from './test/test';
import Login from './login/login';
import Register from './register/register';

const Main = () => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    keycloak.init({ onLoad: 'check-sso' }).then(authenticated => {
      setAuthenticated(authenticated);
    });
  }, []);

  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<Test isAuthenticated={authenticated} />} />
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<Main />);