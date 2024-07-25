import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';
import { getToken, verifyToken, getUserDetails } from '../utils/auth'; // Import authentication utilities
import { IFeedPost } from '@duality-social/duality-social-lib';

const Feed = () => {
    const [posts, setPosts] = useState<IFeedPost[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [defaultDepth, setDefaultDepth] = useState<number>(10); // Add state for defaultDepth

    useEffect(() => {
        const token = getToken();
        if (token && verifyToken(token)) {
            setIsAuthenticated(true);
            fetchUserProfile(token); // Fetch user profile to get defaultDepth
        }
    }, []);

    const fetchUserProfile = async (token: string) => {
        try {
            const response = await axios.get('/api/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setDefaultDepth(response.data.defaultDepth); // Set defaultDepth from profile
            fetchPosts(token, response.data.defaultDepth); // Fetch posts with defaultDepth
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const fetchPosts = async (token: string, depth: number) => {
        try {
            const response = await axios.get(`/api/feed?depth=${depth}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPosts(response.data.posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    if (!isAuthenticated) {
        return <div>Not authenticated</div>;
    }

    return (
        <div>
            {posts.map((post: IFeedPost) => (
                <Post key={post._id?.toString()} post={post} />
            ))}
        </div>
    );
};

export default Feed;