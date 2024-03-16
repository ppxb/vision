import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

import AppRouterGuard from '@renderer/components/AppRouterGuard'
import AppLayout from '@renderer/components/AppLayout'

import LoginView from '@renderer/views/login'
import HomeView from '@renderer/views/home'
import MediaView from '@renderer/views/media'

export const routerMap: RouteObject[] = [
  {
    path: '/',
    element: (
      <AppRouterGuard>
        <AppLayout />
      </AppRouterGuard>
    ),
    children: [
      {
        path: '/login',
        element: <LoginView />
      },
      {
        index: true,
        element: <HomeView />
      },
      {
        path: '/media',
        element: <MediaView />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
]

const Router = () => useRoutes(routerMap)

export default Router
