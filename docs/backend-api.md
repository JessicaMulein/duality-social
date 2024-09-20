## Backend API

References: `/apps/duality-social-node`, `/apps/duality-social-node-e2e`

The backend Node.js API for the Duality Social application is responsible for handling user authentication, managing the social feed, and integrating with external services. The key functionality is provided by the following components:

**Routes**:
The main API routes are set up in the `/apps/duality-social-node/src/routes/api.route.ts` file. This file defines two sub-routers: `/feed` and `/user`, which are handled by the [`FeedController`](/apps/duality-social-node/src/controllers/api/feed.ts#L5) and [`UserController`](/apps/duality-social-node/src/controllers/api/user.ts#L4) classes, respectively.

**Controllers**:

- The [`FeedController`](/apps/duality-social-node/src/controllers/api/feed.ts#L5) class in `/apps/duality-social-node/src/controllers/api/feed.ts` handles the API endpoints related to the feed functionality, such as retrieving the user's feed, creating new posts and replies, and managing reactions and ratings.
- The [`UserController`](/apps/duality-social-node/src/controllers/api/user.ts#L4) class in `/apps/duality-social-node/src/controllers/api/user.ts` handles the API endpoints for user registration and login.

**Services**:

- The [`FeedService`](/apps/duality-social-node/src/services/feed.ts#L14) class in `/apps/duality-social-node/src/services/feed.ts` provides the core functionality for managing the social feed, including retrieving the user's feed, fetching more feed items, getting replies to a specific post, and creating new posts and replies.
- The [`UserService`](/apps/duality-social-node/src/services/user.ts#L16) class in `/apps/duality-social-node/src/services/user.ts` handles user registration, login, and token management.

**OpenAI Integration**:
The `/apps/duality-social-node/src/services/openai.ts` file contains utility functions for interacting with the OpenAI API, including generating text and images using OpenAI's models.

**Middleware**:
The `/apps/duality-social-node/src/middlewares` directory contains two important middleware functions:

- [`authenticateJWT`](/apps/duality-social-node/src/middlewares/authenticateJwt.ts#L4): Verifies the validity of the JWT (JSON Web Token) included in the [`Authorization`](/apps/duality-social-node/src/fetch.ts#L17) header of incoming requests.
- [`requireAuth`](/apps/duality-social-node/src/middlewares/requireAuth.ts#L3): Ensures that only authenticated users can access certain routes or functionality.

**Error Handling**:
The `/apps/duality-social-node/src/errors` directory contains a set of custom error classes that extend the built-in [`Error`](/apps/duality-social-node/src/services/feed.ts#L17) class, such as [`EmailExistsError`](/apps/duality-social-node/src/errors/emailExists.ts#L1), [`InvalidEmail`](/apps/duality-social-node/src/errors/invalidEmail.ts#L1), [`InvalidPassword`](/apps/duality-social-node/src/errors/invalidPassword.ts#L1), and [`UsernameExistsError`](/apps/duality-social-node/src/errors/usernameExists.ts#L1). These error classes provide a structured way of handling and reporting specific error conditions in the application.

**Environment Configuration**:
The `/apps/duality-social-node/src/interfaces/environment.ts` file defines the [`IEnvironment`](/apps/duality-social-node/src/interfaces/environment.ts#L3) interface, which represents the configuration settings for the application, including production environment, site URL, developer settings, OpenAI integration, MongoDB connection, cookie settings, and Pusher integration. The [`validateEnvironment`](/apps/duality-social-node/src/interfaces/environment.ts#L34) function ensures that the required environment variables are set.
