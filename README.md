[![Codacy Badge](https://app.codacy.com/project/badge/Grade/e95710e25f8f41a48b1d17f1f751af71)](https://app.codacy.com/gh/Digital-Defiance/duality-social/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

# DualitySocial

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨

The Duality Social repository is a comprehensive platform that combines a Turing test-inspired social network with advanced language and image generation capabilities powered by the OpenAI API. The repository contains the core functionality for the Duality Social application, including user authentication, social feed management, post and viewpoint creation, and integration with external services.

The most important components of the repository are the data models, schemas, and utility functions defined in the `/libs/duality-social-lib/src/lib` directory. This directory contains the TypeScript interfaces and Mongoose schemas that define the structure of various entities in the application, such as users, posts, viewpoints, and related metadata. It also includes utility functions for processing user-generated content, such as parsing Markdown and handling custom icons.

The backend API, implemented in the `/apps/duality-social-node` directory, provides the core functionality for the Duality Social application. This includes user authentication, social feed management, and integration with the OpenAI API for text and image generation. The API is built using Express.js and leverages the data models and schemas defined in the [`duality-social-lib`](/libs/duality-social-lib/src/lib/duality-social-lib.ts#L0) library.

The frontend React application, located in the `/apps/duality-social-react` directory, provides the user interface for the Duality Social platform. This includes components for displaying the user's feed, handling user authentication, and rendering individual posts and viewpoints. The frontend application also utilizes the utility functions and data models defined in the [`duality-social-lib`](/libs/duality-social-lib/src/lib/duality-social-lib.ts#L0) library.

The repository also includes a background worker application, `/apps/duality-social-queue-worker`, which is responsible for performing various tasks, such as querying the database and logging posts with missing AI-generated viewpoints.

The key design choices of the Duality Social repository include:

- Separation of concerns between the backend API, frontend application, and background workers
- Centralized data modeling and schema management using Mongoose interfaces, schemas, models, and documents
- Consistent use of TypeScript interfaces and enumerations to ensure type safety throughout the codebase
- Integration with the OpenAI API for advanced language and image generation capabilities
- Modular and extensible architecture to support future growth and development

Overall, the Duality Social repository provides a powerful and flexible platform for building a social network that combines human-generated content with AI-powered features. The detailed data models, schemas, and utility functions defined in the [`duality-social-lib`](/libs/duality-social-lib/src/lib/duality-social-lib.ts#L0) library, along with the well-structured backend API and frontend application, make this repository a valuable resource for developers looking to build similar types of applications.

## Development server

Run yarn in the root, apps/duality-social-node, and libs/duality-social-lib.

In the root, run yarn build:all:dev.

Optionally run tests: yarn test:all (or test:lib:all, test:lib:fontawesome, test:node).

In the root, run `yarn serve:dev` for a dev server. Navigate to <http://localhost:3000/>. The app will automatically reload if you change any of the source files.

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

## Remote caching

Run `npx nx connect-to-nx-cloud` to enable [remote caching](https://nx.app) and make CI faster.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
