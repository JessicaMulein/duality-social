import React, { useState } from 'react';
import axios from 'axios';

interface NewPost {
  title: string;
  content: string;
}

const NewPostForm: React.FC = () => {
  const [newPost, setNewPost] = useState<NewPost>({
    title: '',
    content: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPost(prevPost => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/posts', newPost);
      const createdPost: NewPost = response.data;
      console.log('New post created:', createdPost);
      // You can update the feed with the newly created post here
      setNewPost({
        title: '',
        content: '',
      });
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={newPost.title} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea id="content" name="content" value={newPost.content} onChange={handleChange} />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default NewPostForm;