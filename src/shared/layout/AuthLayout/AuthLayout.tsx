import { Outlet } from 'react-router'
import { Header } from '@/shared/layout'
import styles from './AuthLayout.module.scss'

export const AuthLayout = () => {
    const isAuth = false

    return (
        <div className={styles.layout}>
            <Header isAuthenticated={isAuth} />
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    )
}
