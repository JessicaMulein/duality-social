### Middleware and Error Handling
References: `/apps/duality-social-node/src/errors`, `/apps/duality-social-node/src/middlewares`

The `/apps/duality-social-node/src/middlewares` directory contains two important middleware functions:

- [`authenticateJWT`](/apps/duality-social-node/src/middlewares/authenticateJwt.ts#L4): This middleware is responsible for verifying the validity of the JWT (JSON Web Token) included in the [`Authorization`](/apps/duality-social-node/src/fetch.ts#L17) header of incoming requests. It extracts the JWT token, verifies it using the [`UserService.verifyToken()`](/apps/duality-social-node/src/middlewares/authenticateJwt.ts#L12) method, retrieves the user associated with the token using the [`UserService.findById()`](/apps/duality-social-node/src/middlewares/authenticateJwt.ts#L13) method, and attaches the user object to the [`req.user`](/apps/duality-social-node/src/services/feed.ts#L16) property. If the token is invalid or the user is not found, it returns a 400 Bad Request response.

- [`requireAuth`](/apps/duality-social-node/src/middlewares/requireAuth.ts#L3): This middleware ensures that only authenticated users can access certain routes or functionality. It checks if the [`req.user`](/apps/duality-social-node/src/services/feed.ts#L16) property is present, which is typically set by an authentication middleware or service. If [`req.user`](/apps/duality-social-node/src/services/feed.ts#L16) is not present, the middleware returns a 401 Unauthorized response.

The `/apps/duality-social-node/src/errors` directory contains a set of custom error classes that extend the built-in [`Error`](/apps/duality-social-node/src/services/feed.ts#L17) class:

- [`EmailExistsError`](/apps/duality-social-node/src/errors/emailExists.ts#L1): Represents an error that occurs when an email address already exists in the system.
- [`InvalidEmail`](/apps/duality-social-node/src/errors/invalidEmail.ts#L1): Represents an error that occurs when an invalid email address is encountered.
- [`InvalidPassword`](/apps/duality-social-node/src/errors/invalidPassword.ts#L1): Represents an error that occurs when an invalid password is provided.
- [`UsernameExistsError`](/apps/duality-social-node/src/errors/usernameExists.ts#L1): Represents an error that occurs when a username already exists in the system.

These custom error classes provide a more specific and informative way to handle and report errors that may occur in the application's business logic.