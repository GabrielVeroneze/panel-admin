import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '@/features/auth/hooks'

export const ProtectedRoute = () => {
    const location = useLocation()

    const { authenticated } = useAuth()

    if (!authenticated) {
        return (
            <Navigate
                to="/auth/sign-in"
                replace
                state={{
                    from: location,
                }}
            />
        )
    }

    return <Outlet />
}
