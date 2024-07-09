import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

const roleAccess = {
  1: ['/', '/contacts', '/leads', '/dashboardProject', '/planner', '/projectManagement', '/collection', '/clients', '/home', '/tasks', '/products', '/team', '/salesman', '/notifications', '/notifications/:id', '/profile', '/admin/dashboard', '/admin/users', '/admin/projects', '/projects', '/projects/create', '/projects/invite/:inviteCode/:projectId'],
  2: ['/tasks', '/notifications', '/profile', '/products', '/projects', '/projects/create'],
  8: ['/tasks', '/notifications'],
  // Add other roles as needed
};

const PrivateRoute = ({ element: Element, path, ...rest }) => {
  const { authenticated, user, loading } = useAuth();
  const userRole = user?.role_id;

  if (loading) {
    return <div>Loading...</div>; // or a more sophisticated loading indicator
  }

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  if (!roleAccess[userRole]?.includes(path)) {
    return <Navigate to="/home" />; // Redirect to a default route if access is denied
  }

  return <Route {...rest} path={path} element={<Element />} />;
};

export default PrivateRoute;
