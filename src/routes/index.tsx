import { createBrowserRouter } from 'react-router'
import { LayoutPage } from '@/shared/layout'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutPage />,
        children: [],
    },
])
