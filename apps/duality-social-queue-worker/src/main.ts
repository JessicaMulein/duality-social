import { IPost } from '@duality-social/duality-social-lib';
import { environment } from './environments/environment.ts';
import { IMongoDb } from './interfaces/mongodb.ts';
import { setupDatabase } from './setupDatabase.ts';
console.log(
  'environment: ',
  environment.production ? 'production' : 'development',
);

// select all documents from posts where aiViewpointId is null
console.log('selecting all documents from posts where aiViewpointId is null');
setupDatabase().then(async ({ db, schema }: IMongoDb) => {
  const { Post } = schema;
  const posts = await Post.find({ aiVpId: null });
  console.log('posts: ', posts);
  posts.forEach((post: IPost) => {
    console.log('post: ', post);
  });
  db.disconnect();
});
