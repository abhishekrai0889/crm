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

function App() {
  const location = useLocation();

  // Pages that should not show header/footer
  const authPages = ["/login", "/signin", "/signup", "/forgot-password"];
  const hideLayout = authPages.includes(location.pathname);

  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes - No Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Trial />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Public Routes - With Header/Footer */}
        <Route element={<AuthLayout hideLayout={hideLayout} />}>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
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
          {/* <Route path="partners" element={<Partners />} />
          <Route path="partners/all" element={<Partners />} />
          <Route path="partners/add" element={<Partners />} />
          <Route path="partners/approvals" element={<Partners />} />
          <Route path="organizations" element={<Organizations />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} /> */}
          <Route path="table" element={<BasicTable />} />
        </Route>

        {/* Catch all - Redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
