import { useEffect } from 'react'
import { getSession } from '@/shared/utils'
import { useAuth } from '@/features/auth/hooks'
import type { PropsWithChildren } from 'react'

type AppInitializerProps = PropsWithChildren

export const AppInitializer = ({ children }: AppInitializerProps) => {
    const { fetchCurrentUser } = useAuth()

    useEffect(() => {
        if (!getSession()) {
            return
        }

        const initializeAuth = async () => {
            try {
                await fetchCurrentUser()
            } catch {
                return
            }
        }

        initializeAuth()
    }, [fetchCurrentUser])

    return children
}
