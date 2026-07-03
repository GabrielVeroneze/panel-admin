import { useEffect } from 'react'
import { getToken } from '@/shared/utils'
import { useAuth } from '@/features/auth/hooks'
import type { PropsWithChildren } from 'react'

type AppInitializerProps = PropsWithChildren

export const AppInitializer = ({ children }: AppInitializerProps) => {
    const { fetchCurrentUser } = useAuth()

    useEffect(() => {
        if (!getToken()) {
            return
        }

        fetchCurrentUser()
    }, [fetchCurrentUser])

    return children
}
