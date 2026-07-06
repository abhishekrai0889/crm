import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./App.css";

// Layout Components
import MainLayout from "./components/layout/MainLayout";
import AuthLayout from "./components/layout/AuthLayout";

// Auth Pages
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import Trial from "./pages/Trial";
import ForgotPassword from "./pages/ForgotPassword";

// Public Pages
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";

// Protected Pages
import Dashboard from "./pages/Dashboard";
import BasicTable from "../src/ui/Example/BasicTable";
// import Partners from "./pages/Partners";
// import Organizations from "./pages/Organizations";
// import Analytics from "./pages/Analytics";
// import Profile from "./pages/Profile";
// import Settings from "./pages/Settings";

// Auth Provider
import { AuthProvider, useAuth } from "./context/AuthContext";
import NotFoundPage from "./pages/NotFoundPage";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

// Public Route Component - Redirect to dashboard if already logged in
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/user/dashboard" replace /> : children;
};

function App() {
  const location = useLocation();

  // Pages that should not show header/footer
  const authPages = ["/login", "/signin", "/signup", "/forgot-password"];
  const hideLayout = authPages.includes(location.pathname);

  return (
    <AuthProvider>
      <Routes>
        {/* Public Auth Routes - No Layout (Redirect to dashboard if logged in) */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Trial />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />

        {/* Public Routes - With Header/Footer (Redirect to dashboard if logged in) */}
        <Route element={<AuthLayout hideLayout={hideLayout} />}>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />
          <Route
            path="/pricing"
            element={
              <PublicRoute>
                <Pricing />
              </PublicRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <PublicRoute>
                <Contact />
              </PublicRoute>
            }
          />
          <Route
            path="/table"
            element={
              <PublicRoute>
                <BasicTable />
              </PublicRoute>
            }
          />
        </Route>

        {/* Protected Routes - With Sidebar Layout */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          {/* Add more protected routes here */}
        </Route>

        {/* Catch all - 404 page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
