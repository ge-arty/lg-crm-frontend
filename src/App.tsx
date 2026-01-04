import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import { Route, Routes } from "react-router-dom";

import PageLoader from "./components/PageLoader";
import HomePage from "./pages/Public/HomePage";

import ProtectedRoute from "./components/routes/ProtectedRoute";
import PublicRoute from "./components/routes/PublicRoute";
import PageNotFound from "./pages/Auth/PageNotFound";
import UnauthorizedPage from "./pages/Auth/UnauthorizedPage";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import SettingsPage from "./pages/Public/SettingsPage";
import PromotersPage from "./pages/Public/PromotersPage";
import PopsPage from "./pages/Public/PopPage";

function App() {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <>
      <Routes>
        <Route
          path='/login'
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path='/signup'
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />

        <Route
          path='/'
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/settings'
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/promoters'
          element={
            <ProtectedRoute>
              <PromotersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/pops'
          element={
            <ProtectedRoute>
              <PopsPage />
            </ProtectedRoute>
          }
        />

        {/* Page not found / Unauthorized */}
        <Route path='/unauthorized' element={<UnauthorizedPage />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
