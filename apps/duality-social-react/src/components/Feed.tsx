import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';

const Feed = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/feed'); // Adjust the API endpoint as needed
                setPosts(response.data.posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            {posts.map(post => (
                <Post key={post._id} post={post} />
            ))}
        </div>
    );
};

export default Feed;