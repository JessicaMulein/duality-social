import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import keycloak from '../keycloak';

const Test: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    keycloak.updateToken(30)
      .then((refreshed) => {
        if (refreshed) {
          setLoading(false);
        } else {
          console.log('Token still valid');
          setLoading(false);
        }
      }).catch(() => {
        console.error('Failed to refresh token');
        navigate('/login');
      });
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // User is authenticated, display user info
  return (
    <div>
      <h2>User Info:</h2>
      <p>Username: {keycloak.tokenParsed?.preferred_username}</p>
      <p>Email: {keycloak.tokenParsed?.email}</p>
    </div>
  );
};

export default Test;