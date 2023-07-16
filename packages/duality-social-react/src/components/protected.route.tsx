import React, { useEffect, useState } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { environment } from '../environments/environment';

interface ProtectedRouteProps {
  path: string;
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ path, element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Replace with your check authentication endpoint
        const response = await axios.get(`${environment.siteUrl}/auth/check-authentication`, {
          withCredentials: true, // Send cookies with the request
        });

        setIsAuthenticated(response.status === 200);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Replace with a loading spinner or similar
  }

  return <Route path={path} element={element} />;
};

export default ProtectedRoute;