import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const user = localStorage.getItem("user");
    console.log('ProtectedRoute User:', user); // Debug log
  
    if (!user) {
      console.warn('No user found, redirecting...');
      return <Navigate to="/"/>;
    }
  
    return children;
  };
  
  export default ProtectedRoute;