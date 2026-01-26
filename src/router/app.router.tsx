import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import { HeroesLayout } from '@/heroes/layouts/HeroesLayout';
import { HomePage } from '@/heroes/pages/home/HomePage';
import { HeroPage } from '@/heroes/pages/hero/HeroPage';
import { AdminPage } from '@/admin/pages/AdminPage';

const SearchPage = lazy(() => import('@/heroes/pages/search/SearchPage'));
const AdminLayout = lazy(() => import('@/admin/layouts/AdminLayout'));

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <HeroesLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'heroes/:slug',
        element: <HeroPage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: '*',
        element: <Navigate to="/" />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
    ],
  },
]);
