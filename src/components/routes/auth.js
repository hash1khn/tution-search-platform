import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { GuestGuard } from 'src/auth/guard';
// layouts
import AuthClassicLayout from 'src/layouts/auth/classic';
// components
import { SplashScreen } from 'src/components/loading-screen';

// JWT
const JwtLoginPage = lazy(() => import('src/pages/auth/jwt/login'));
const JwtRegisterPage = lazy(() => import('src/pages/auth/jwt/register'));
const JwtForgotPasswordPage = lazy(() => import('src/pages/auth/jwt/forgot-password'));
const JwtNewPasswordPage = lazy(() => import('src/pages/auth/jwt/new-password'));

const authJwt = {
  path: 'jwt',
  element: (
    <GuestGuard>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    </GuestGuard>
  ),
  children: [
    {
      path: 'login',
      element: (
        <AuthClassicLayout>
          <JwtLoginPage />
        </AuthClassicLayout>
      ),
    },
    {
      path: 'register',
      element: (
        <AuthClassicLayout title="Start with Studly Today">
          <JwtRegisterPage />
        </AuthClassicLayout>
      ),
    },
    {
      path: 'forgot-password',
      element: (
        <AuthClassicLayout title="forgot-password">
          <JwtForgotPasswordPage />
        </AuthClassicLayout>
      ),
    },
    {
      path: 'new-password',
      element: (
        <AuthClassicLayout title="new-password">
          <JwtNewPasswordPage />
        </AuthClassicLayout>
      ),
    },
  ],
};

export const authRoutes = [
  {
    path: 'auth',

    children: [authJwt],
  },
];
