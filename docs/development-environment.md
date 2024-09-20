## Development Environment

References: `/jest.config.ts`, `/jest.preset.js`

The `/duality-social` directory is a monorepo workspace generated using Nx, a smart, fast, and extensible build system. It contains the main applications and libraries that make up the Duality Social platform.

The key components in this directory are:

- The `/apps` directory, which contains the main applications that make up the Duality Social platform, including the backend Node.js API, the frontend React application, and various worker processes.
- The `/libs` directory, which contains the core functionality and data models for the Duality Social application, including data structures, enumerations, Mongoose schemas, and utility functions.
- The `/Dockerfile`, which provides a Docker configuration for setting up the development environment for the Duality Social application.
- The `/jest.config.ts` file, which is a configuration file for the Jest testing framework, setting up the testing environment and specifying the transformation rules for the project's TypeScript files.
- The `/jest.preset.js` file, which sets up the Jest testing environment for the [`duality-social`](/libs/duality-social-lib/src/lib/duality-social-lib.ts#L0) project by leveraging the default preset from the `@nrwl/jest/preset` module.

The Dockerfile uses the `mcr.microsoft.com/devcontainers/javascript-node:0-18-bullseye` image as the base, which provides a pre-configured Node.js development environment. It installs additional dependencies, such as [`build-essential`](/Dockerfile#L3), [`python2`](/Dockerfile#L3), and global Node.js packages ([`npm`](/migrations.json#L31), [`nx`](/nx.json#L2), [`yarn`](/yarn.lock#L0)), to ensure the development environment is properly set up. The Dockerfile then copies the application code, including the [`package.json`](/package.json#L0), [`package-lock.json`](/Dockerfile#L8) (or [`yarn.lock`](/yarn.lock#L0)), and the source code for the `/libs/duality-social-lib`, `/apps/duality-social-react`, and `/apps/duality-social-node` directories. Finally, it runs the [`yarn fontawesome:setup`](/Dockerfile#L20), [`yarn all`](/Dockerfile#L21), and [`yarn all:build`](/Dockerfile#L22) commands to build the application and exposes port 3000.

The `/jest.config.ts` file uses the [`getJestProjects()`](/jest.config.ts#L1) function from the `@nrwl/jest` package to set up multiple Jest projects for the application. It specifies the preset configuration file to be used, the test environment, and the transformation rules for TypeScript files.

The `/jest.preset.js` file imports the default preset from the `@nrwl/jest/preset` module and exports it as the configuration for the project.
