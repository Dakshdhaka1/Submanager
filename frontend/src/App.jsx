import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SubscriptionForm from './pages/SubscriptionForm';
import OAuth2RedirectHandler from './pages/OAuth2RedirectHandler';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
          },
          success: { iconTheme: { primary: '#34d399', secondary: '#111' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#111' } }
        }}
      />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/subscriptions/new" element={
            <ProtectedRoute><SubscriptionForm /></ProtectedRoute>
          } />
          <Route path="/subscriptions/:id/edit" element={
            <ProtectedRoute><SubscriptionForm /></ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
