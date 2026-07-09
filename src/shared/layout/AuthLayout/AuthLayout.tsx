import { Outlet } from 'react-router'
import { Header } from '@/shared/layout'
import { useAuth } from '@/features/auth/hooks'
import styles from './AuthLayout.module.scss'

export const AuthLayout = () => {
    const { authenticated } = useAuth()

    return (
        <div className={styles.layout}>
            <Header isAuthenticated={authenticated} />
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    )
}
