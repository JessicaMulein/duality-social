### Schemas

References: `/libs/duality-social-lib/src/lib/schemas`

The Mongoose schemas defined in the `/libs/duality-social-lib/src/lib/schemas` directory provide the structure and validation rules for the various data models used in the Duality Social application.

The [`PostSchema`](/libs/duality-social-lib/src/lib/schemas/post.ts#L8) defines the schema for a post, including fields for the post's depth, number of replies, last reply details, parent post ID, input and AI-generated viewpoint IDs, image URLs, deletion status, and various metadata. The schema includes several indexes to optimize queries based on fields like parent post ID, viewpoint IDs, creator, updater, creation date, and processing lock.

The [`LoginSchema`](/libs/duality-social-lib/src/lib/schemas/login.ts#L8) defines the schema for a user login event, including fields for the user ID, IP address, and user agent string. All of these fields are required, non-nullable, and immutable.

The [`ClaimedInvitationSchema`](/libs/duality-social-lib/src/lib/schemas/claimedInvitation.ts#L17) defines the schema for a claimed invitation, including fields for the invitation ID, IP address, email, code, and phone number of the user who claimed the invitation. The email and phone fields are optional, but must be valid if provided.

The [`EmailChangeSchema`](/libs/duality-social-lib/src/lib/schemas/emailChange.ts#L14) defines the schema for a user's email change request, including fields for the user ID, the new email address, and a randomly generated token.

The [`InvitationSchema`](/libs/duality-social-lib/src/lib/schemas/invitation.ts#L12) defines the schema for an invitation, including fields for the email, phone, code, maximum number of uses, metadata, the user who created the invitation, and the user who last updated the invitation. The code field is randomly generated.

The [`PostViewpointSchema`](/libs/duality-social-lib/src/lib/schemas/postViewpoint.ts#L7) defines the schema for a viewpoint or opinion expressed on a post, including fields for the post ID, number of replies, humanity type, viewpoint type, language, parent viewpoint ID, content, rendering status, deletion status, and various metadata. The schema includes indexes to optimize queries by post and humanity type, post and viewpoint type, and parent viewpoint and creation timestamp.

The [`UserSchema`](/libs/duality-social-lib/src/lib/schemas/user.ts#L13) defines the schema for a user, including fields for the account status, email, username, hashed password, humanity type, preferred languages, lock status, shadow ban status, last login date, and various metadata. The schema includes validation rules for the email and username fields.

[Core Data Models and Utilities](#core-data-models-and-utilities)
