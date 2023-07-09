import React from 'react';
import * as ReactDOM from 'react-dom/client';
import axios from "axios";

import App from './app/app';

// HTTP
// const _axios = axios.create();
// _axios.interceptors.request.use(async (config) => {
//   if (isLoggedIn()) {
//     try {
//       await updateToken(() => {
//         config.headers.Authorization = `Bearer ${getToken()}`;
//         return Promise.resolve(config);
//       });
//     } catch (e) {
//       console.error(e);
//       doLogin();
//     }
//   }
//   return config;
// });

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);