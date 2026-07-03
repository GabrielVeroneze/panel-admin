import { createBrowserRouter } from 'react-router'
import { AppLayout, AuthLayout, PageLayout } from '@/shared/layout'
import { ProtectedRoute } from '@/shared/auth'
import { ErrorPage, NotFoundPage } from '@/shared/pages'
import { DashboardPage } from '@/features/dashboard'
import { UsersPage } from '@/features/users'
import { MyProfilePage, UserProfilePage } from '@/features/profile'
import { ProductsPage } from '@/features/products'
import { SettingsPage } from '@/features/settings'
import { SignInPage, SignUpPage } from '@/features/auth'

export const router = createBrowserRouter([
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'sign-in',
                element: <SignInPage />,
            },
            {
                path: 'sign-up',
                element: <SignUpPage />,
            },
        ],
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: '/',
                element: <AppLayout />,
                errorElement: <ErrorPage />,
                children: [
                    {
                        element: <PageLayout />,
                        children: [
                            {
                                index: true,
                                element: <DashboardPage />,
                            },
                            {
                                path: 'profile',
                                element: <MyProfilePage />,
                            },
                            {
                                path: 'users/:userId',
                                element: <UserProfilePage />,
                            },
                            {
                                path: 'settings',
                                element: <SettingsPage />,
                            },
                        ],
                    },
                    {
                        element: <PageLayout variant="plain" />,
                        children: [
                            {
                                path: 'users',
                                element: <UsersPage />,
                            },
                            {
                                path: 'products',
                                element: <ProductsPage />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
])
