import React from 'react';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Catalog from './pages/Catalog';
import Users from './pages/Users';
import Documents from './pages/Documents';
import Loans from './pages/Loans';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default function Routes() {
  return (
    <RouterRoutes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="users" element={<Users />} />
        <Route path="documents" element={<Documents />} />
        <Route path="loans" element={<Loans />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </RouterRoutes>
  );
}
