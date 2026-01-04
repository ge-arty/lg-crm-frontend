import { Navigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { useAuthStore } from "../../store/useAuthStore";

const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) => {
  const { authUser } = useAuthStore();

  if (!authUser) {
    return <Navigate to='/login' replace />;
  }

  if (allowedRoles && !allowedRoles.includes(authUser.role)) {
    return <Navigate to='/unauthorized' replace />;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

export default ProtectedRoute;
