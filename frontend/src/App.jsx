import { Navigate, Route, Routes } from 'react-router-dom';
import OverviewPage from './pages/OverviewPage';
import ProductsPage from './pages/ProductsPage';
import Sidebar from './components/common/Sidebar';
import UsersPage from './pages/UsersPage';
import SalesPage from './pages/SalesPage';
import OrdersPage from './pages/OrdersPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import AdministrationPage from './pages/AdministrationPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider, useAuth } from './components/contexts/AuthContext';
import ProtectedRoute from './components/routes/ProtectedRoute';
import AppBackground from './components/common/AppBackgroud';
import { ThemeProvider } from './components/contexts/ThemeContext';
// import ChatBox from './components/chat/ChatBox';

// A child component for using useAuth after AuthProvider wraps the app
function AppContent() {
  const { isAuthenticated } = useAuth();
  // const token = localStorage.getItem('accessToken');
  // const roomName = "admin_1_operator_2"; // Replace with dynamic room names if needed

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Background Overlay */}
      <AppBackground/>

      {/* Conditionally render Sidebar */}
      {isAuthenticated && <Sidebar />}

      {/* <div className="app relative bg-gray-900 text-gray-100 min-h-screen p-4">
        <h1 className="text-3xl font-bold mb-6" >Chat System</h1>
          <ChatBox roomName={roomName} token={token} />
      </div> */}

      <div className="flex-1 overflow-auto relative z-10">
        <Routes>
          {/* Public Route (Login) */}
          <Route path="/" element={<LoginPage />} />
          {/* Catch-all route for non-matching paths */}
          <Route path="*" element={<Navigate to="/admin" />} />

          {/* Protected Routes */}
          <Route
            path="/overview"
            element={
              <ProtectedRoute>
                <OverviewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sales"
            element={
              <ProtectedRoute>
                <SalesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdministrationPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider> {/* Wrapping entire app in AuthProvider */}
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
