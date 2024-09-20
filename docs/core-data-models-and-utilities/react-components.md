### React Components
References: `/apps/duality-social-react/src/components`

The key React components that make up the Duality Social frontend application are:

- `/apps/duality-social-react/src/components/Feed.tsx`:
  - The [`Feed`](/apps/duality-social-react/src/components/Feed.scss#L0) component uses the [`useEffect`](/apps/duality-social-react/src/app/app.tsx#L1) hook to check if the user is authenticated and fetch the user's profile information, including the [`defaultDepth`](/libs/duality-social-lib/src/lib/interfaces/profile.ts#L26) setting.
  - The [`fetchPosts`](/apps/duality-social-react/src/components/Feed.tsx#L28) function is used to fetch the user's feed of posts from the backend API, using the [`defaultDepth`](/libs/duality-social-lib/src/lib/interfaces/profile.ts#L26) value to determine the depth of the feed.
  - The [`Post`](/apps/duality-social-queue-worker/src/main.ts#L10) component is used to render each individual post in the feed.

- `/apps/duality-social-react/src/components/Post.tsx`:
  - The [`Post`](/apps/duality-social-queue-worker/src/main.ts#L10) component receives a [`post`](/apps/duality-social-node/src/services/feed.ts#L439) prop of type [`IFeedPost`](/libs/duality-social-lib/src/lib/interfaces/feedPost.ts#L3), which contains the [`inputViewpoint`](/apps/duality-social-node/src/services/feed.ts#L456) and [`aiViewpoint`](/apps/duality-social-node/src/services/openai.ts#L270) properties.
  - The [`getSortedViewpoints`](/apps/duality-social-react/src/components/Post.tsx#L12) function is used to sort the viewpoints based on their [`rank`](/libs/duality-social-lib/src/lib/interfaces/feedViewpoint.ts#L2) property, or randomly if the [`rank`](/libs/duality-social-lib/src/lib/interfaces/feedViewpoint.ts#L2) is undefined for both viewpoints.
  - The component uses the [`useState`](/apps/duality-social-react/src/app/app.tsx#L1) hook to manage the state of the [`viewpoints`](/libs/duality-social-lib/src/lib/interfaces/post.ts#L9) array and the [`collapsed`](/apps/duality-social-react/src/components/Post.tsx#L21) boolean, which determines whether the viewpoints are expanded or collapsed.
  - The [`toggleCollapse`](/apps/duality-social-react/src/components/Post.tsx#L23) function is called when the user clicks the "Expand" or "Collapse" button, updating the [`collapsed`](/apps/duality-social-react/src/components/Post.tsx#L21) state.
  - The [`PostViewpoint`](/libs/duality-social-lib/src/lib/enumerations/modelName.ts#L10) component is used to render each individual viewpoint.

- `/apps/duality-social-react/src/components/PostViewpoint.tsx`:
  - The [`PostViewpoint`](/libs/duality-social-lib/src/lib/enumerations/modelName.ts#L10) component receives a [`viewpoint`](/apps/duality-social-node/src/services/feed.ts#L560) prop of type [`IFeedViewpoint`](/libs/duality-social-lib/src/lib/interfaces/feedViewpoint.ts#L1), which contains the necessary information to render the viewpoint.
  - The component renders the [`viewpoint.content`](/apps/duality-social-react/src/components/PostViewpoint.tsx#L12) within a [`<p>`](/apps/duality-social-react/src/components/UserProfile.tsx#L42) element, and iterates over the [`viewpoint.reactions`](/apps/duality-social-react/src/components/PostViewpoint.tsx#L14) object to render the reaction emojis and counts.
  - The component also renders the [`viewpoint.repliesCount`](/apps/duality-social-react/src/components/PostViewpoint.tsx#L21) within a [`<div>`](/apps/duality-social-react/src/app/app.tsx#L20) element.

- `/apps/duality-social-react/src/components/UserProfile.tsx`:
  - The [`UserProfile`](/apps/duality-social-react/src/components/UserProfile.tsx#L4) component uses several utility functions from the [`auth`](/apps/duality-social-react/src/utils/auth.ts#L0) module to handle user authentication and fetch the user's profile details.
  - The component has three state variables: [`user`](/libs/duality-social-lib/src/lib/schemas/user.ts#L39), [`isAuthenticated`](/apps/duality-social-react/src/app/app.tsx#L10), and [`isLoading`](/apps/duality-social-react/src/components/UserProfile.tsx#L7).
  - In the [`useEffect`](/apps/duality-social-react/src/app/app.tsx#L1) hook, the component checks if a valid authentication token is present and calls the [`fetchUserProfile`](/apps/duality-social-react/src/components/Feed.tsx#L16) function to fetch the user's details.
  - The component renders different content based on the values of [`isLoading`](/apps/duality-social-react/src/components/UserProfile.tsx#L7) and [`isAuthenticated`](/apps/duality-social-react/src/app/app.tsx#L10), displaying the user's profile information if the user is authenticated, or a "Not authenticated" message if the user is not authenticated.