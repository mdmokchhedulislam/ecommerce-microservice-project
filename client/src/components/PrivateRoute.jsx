import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.user);

  return isAuthenticated ? children : <Navigate to="/signin" />;
}

export default PrivateRoute;
