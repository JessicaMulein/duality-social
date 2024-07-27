import React, { useEffect, useState } from 'react';
import { getToken, verifyToken, getUserDetails } from '../utils/auth';

const UserProfile = () => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token && verifyToken(token)) {
      setIsAuthenticated(true);
      fetchUserProfile(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const userDetails = await getUserDetails(token);
      setUser(userDetails);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || user === null) {
    return <div>Not authenticated</div>;
  }

  return (
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>{user.preferred_username}</p>
      <p>{user.sub}</p>
    </div>
  );
};

export default UserProfile;