import { Outlet } from 'react-router'
import { Header } from '@/shared/layout'
import styles from './AuthLayout.module.scss'

export const AuthLayout = () => {
    return (
        <div className={styles.layout}>
            <Header />
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    )
}
