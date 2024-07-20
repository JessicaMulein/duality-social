import { environment } from "./environments/environment";
import { IPost } from "@duality-social/duality-social-lib";
console.log("environment: ", environment.production ? "production" : "development");

import { setupDatabase } from "./setupDatabase";

// select all documents from posts where aiViewpointId is null
console.log("selecting all documents from posts where aiViewpointId is null");
setupDatabase().then(async ({ db, schema }) => {
    const { Post } = schema;
    const posts = await Post.find({ aiVpId: null });
    console.log("posts: ", posts);
    posts.forEach((post: IPost) => {
        console.log("post: ", post);
    });
    db.disconnect();
});