## Core Data Models and Utilities

References: `/libs/duality-social-lib/src/lib`, `/libs/duality-social-lib/src/lib/documents`, `/libs/duality-social-lib/src/lib/enumerations`, `/libs/duality-social-lib/src/lib/interfaces`, `/libs/duality-social-lib/src/lib/models`, `/libs/duality-social-lib/src/lib/schemas`

The core data models, schemas, and utility functions used throughout the Duality Social application are defined in the `/libs/duality-social-lib/src/lib` directory. This directory contains several subdirectories and files that work together to provide the fundamental building blocks for the application.

The `/libs/duality-social-lib/src/lib/documents` directory defines a set of TypeScript interfaces that represent the structure of various documents used in the application's data model. These interfaces extend the [`Document`](/apps/duality-social-node/src/services/user.ts#L2) interface from the [`mongoose`](/package.json#L65) library, which provides the necessary functionality for interacting with MongoDB documents.

The interfaces defined in this directory represent different types of data stored in the application's database, such as admin users, claimed invitations, email changes, invitations, logins, posts, post expansions, post impressions, post viewpoints, post viewpoint reactions, user profiles, reports, sudo logs, users, and username changes. By defining these interfaces, the application can ensure a consistent and structured approach to working with the various types of data stored in the MongoDB database.

The `/libs/duality-social-lib/src/lib/interfaces` directory contains a collection of TypeScript interfaces that define the data structures and models used throughout the Duality Social application. These interfaces cover a wide range of functionality, including user profiles, posts, reactions, reports, invitations, and administrative actions. By defining these interfaces, the codebase can maintain a clear and organized structure, making it easier to develop, maintain, and extend the application over time.

The `/libs/duality-social-lib/src/lib/enumerations` directory contains a collection of TypeScript files that define various enumerations and types used throughout the Duality Social application. These enumerations and types provide a consistent and type-safe way of working with different concepts, such as account statuses, default reaction types, Font Awesome icon styles, humanity types, lock types, model names, post-processing job statuses, report types, and viewpoint types.

The `/libs/duality-social-lib/src/lib/duality-social-lib.ts`, `/libs/duality-social-lib/src/lib/font-awesome`, and `/libs/duality-social-lib/src/lib/reactions.ts` files contain utility functions used for processing user-generated content, such as parsing Markdown and handling custom icons.

The `/libs/duality-social-lib/src/lib/models` directory contains the [`BaseModel`](/libs/duality-social-lib/src/lib/models/baseModel.ts#L32) class and its associated functionality, which provides a centralized way to create, retrieve, and interact with Mongoose models used throughout the application.

[Data Models](#data-models)
[Schemas](#schemas)
[Enumerations and Types](#enumerations-and-types)
[Utility Functions](#utility-functions)
[Model Management](#model-management)
