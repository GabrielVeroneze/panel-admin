import { Outlet } from 'react-router'
import { Header } from '@/shared/layout'
import styles from './SystemLayout.module.scss'

export const SystemLayout = () => {
    return (
        <div className={styles.layout}>
            <Header />
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    )
}
