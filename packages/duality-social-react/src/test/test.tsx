import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface TestProps {
  isAuthenticated: boolean | null;
}

const Test: React.FC<TestProps> = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated === null) {
      // Keycloak is still initializing
      return;
    }

    if (isAuthenticated === false) {
      // User is not authenticated, redirect to login
      navigate('/login', { state: { from: location } });
    }

    // User is authenticated
    // continue with the rest of the component
  }, [isAuthenticated, navigate, location]);

  // Rest of the component logic here...
  return <div>Test</div>
};

export default Test;