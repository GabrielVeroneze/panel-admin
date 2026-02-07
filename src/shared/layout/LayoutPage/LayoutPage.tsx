import { Outlet } from 'react-router'
import { Header, Sidebar } from '@/shared/layout'
import styles from './LayoutPage.module.scss'

export const LayoutPage = () => {
    const isAuth = false

    return (
        <div className={styles.layout}>
            <Header isAuthenticated={isAuth} />
            <Sidebar />
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    )
}
