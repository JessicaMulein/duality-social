### Social Feed Management
References: `/apps/duality-social-node/src/controllers/api/feed.ts`, `/apps/duality-social-node/src/services/feed.ts`

The [`FeedController`](/apps/duality-social-node/src/controllers/api/feed.ts#L5) class in `/apps/duality-social-node/src/controllers/api/feed.ts` is responsible for handling the API endpoints related to the social feed functionality in the Duality Social application. It uses the [`FeedService`](/apps/duality-social-node/src/services/feed.ts#L14) class to perform the necessary operations.

The [`FeedController`](/apps/duality-social-node/src/controllers/api/feed.ts#L5) class defines the following routes:

- `POST /`: Handles creating a new post in the feed.
- `POST /preview`: Handles creating a new reply in the feed.
- `POST /react`: Handles reacting to a viewpoint in the feed.
- `POST /rate`: Handles rating a viewpoint in the feed.

The [`getFeed()`](/apps/duality-social-node/src/services/feed.ts#L15) method in the [`FeedController`](/apps/duality-social-node/src/controllers/api/feed.ts#L5) class retrieves the user's feed data and sends it as a JSON response. It calls the [`getFeed()`](/apps/duality-social-node/src/services/feed.ts#L15) method of the [`FeedService`](/apps/duality-social-node/src/services/feed.ts#L14) class to fetch the relevant posts, including their content, creator information, timestamps, translations, reactions, and humanity type.

The [`newPost()`](/apps/duality-social-node/src/services/feed.ts#L416) method in the [`FeedController`](/apps/duality-social-node/src/controllers/api/feed.ts#L5) class is responsible for creating a new post in the feed. It calls the [`newPost()`](/apps/duality-social-node/src/services/feed.ts#L416) method of the [`FeedService`](/apps/duality-social-node/src/services/feed.ts#L14) class, which sanitizes the post content, detects the post language, and ensures the content length is within the specified maximum. It then creates a new [`PostModel`](/apps/duality-social-node/src/services/feed.ts#L7) and [`PostViewpointModel`](/apps/duality-social-node/src/services/feed.ts#L8) instance and saves them to the database. If the detected language is not English, it also creates an English translation of the post.

The [`newReply()`](/apps/duality-social-node/src/services/feed.ts#L485) method in the [`FeedController`](/apps/duality-social-node/src/controllers/api/feed.ts#L5) class handles the creation of a new reply to an existing post. It checks the existence of the parent post, sanitizes the reply content, and ensures the content length is within the specified maximum. It then creates a new [`PostModel`](/apps/duality-social-node/src/services/feed.ts#L7) instance for the reply and saves it to the database.

The [`reactToViewpoint()`](/apps/duality-social-node/src/services/feed.ts#L552) method in the [`FeedController`](/apps/duality-social-node/src/controllers/api/feed.ts#L5) class allows a user to react to a specific viewpoint. It first removes any existing reaction from the user, and then creates a new reaction if a valid reaction type is provided.

The [`rateViewpoint()`](/apps/duality-social-node/src/services/feed.ts#L586) method in the [`FeedController`](/apps/duality-social-node/src/controllers/api/feed.ts#L5) class allows a user to rate the humanity of a specific viewpoint. It checks if the user has already rated the viewpoint and updates the existing rating or creates a new one.

The [`FeedService`](/apps/duality-social-node/src/services/feed.ts#L14) class, located in `/apps/duality-social-node/src/services/feed.ts`, is the main entry point for managing the social feed functionality in the Duality Social application. It handles the retrieval, creation, and interaction with posts and viewpoints, leveraging Mongoose models and aggregation pipelines to efficiently fetch and manipulate the data.