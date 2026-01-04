import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { authUser } = useAuthStore();

  if (authUser) {
    return <Navigate to='/' replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
