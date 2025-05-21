import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import PrivateRoute from './features/auth/PrivateRoute';
import Loader from './component/Loader';

// Lazy load صفحات
const Login = lazy(() => import('./features/auth/Login'));
const Dashboard = lazy(() => import('./features/auth/Dashboard'));
const Products = lazy(() => import('./features/products/Products'));


//const Loader = () => <div>Loading...</div>;

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Suspense fallback={<Loader />}>
          <Dashboard />
        </Suspense>
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/products",
    element: (
      <PrivateRoute>
        <Suspense fallback={<Loader />}>
          <Products />
        </Suspense>
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);
