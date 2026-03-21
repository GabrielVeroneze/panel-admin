import { createBrowserRouter } from 'react-router'
import { AppLayout, AuthLayout, PageLayout } from '@/shared/layout'
import { ErrorPage, NotFoundPage } from '@/shared/pages'
import { DashboardPage } from '@/features/dashboard'
import { UsersPage } from '@/features/users'
import { ProfilePage } from '@/features/profile'
import { ProductsPage } from '@/features/products'
import { SettingsPage } from '@/features/settings'
import { SignInPage, SignUpPage } from '@/features/auth'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                element: <PageLayout />,
                children: [
                    { index: true, element: <DashboardPage /> },
                    { path: 'profile', element: <ProfilePage /> },
                    { path: 'settings', element: <SettingsPage /> },
                ],
            },
            { path: 'users', element: <UsersPage /> },
            { path: 'products', element: <ProductsPage /> },
        ],
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            { path: 'sign-in', element: <SignInPage /> },
            { path: 'sign-up', element: <SignUpPage /> },
        ],
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
])
