import { Navigate } from 'react-router-dom';

export const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('id_token');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};
