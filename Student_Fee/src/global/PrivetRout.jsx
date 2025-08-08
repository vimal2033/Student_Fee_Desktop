import { Navigate } from 'react-router-dom';
import { useMyContext } from './MyContext.jsx';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useMyContext();

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
