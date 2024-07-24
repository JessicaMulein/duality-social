import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginLink.scss';

function LoginLink() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/login');
  };

  return (
    <button className="button-as-link" onClick={handleRedirect}>
      Log In
    </button>
  );
}

export default LoginLink;