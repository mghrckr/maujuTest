import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const accessToken = localStorage.getItem('access_token');

  return accessToken ? <Element {...rest} /> : <Navigate to="/sign-in" replace />;
};

export default PrivateRoute;
