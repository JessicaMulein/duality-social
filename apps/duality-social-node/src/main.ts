import { App, application } from './application.ts';
import { environment } from './environment.ts';
import { validateEnvironment } from './interfaces/environment.ts';

const app: App = application;

validateEnvironment(environment, () => {
  app.start();
});
