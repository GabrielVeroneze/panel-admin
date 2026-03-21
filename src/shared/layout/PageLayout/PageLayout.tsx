import { Outlet } from 'react-router'
import { Footer } from '@/shared/layout'
import styles from './PageLayout.module.scss'

export const PageLayout = () => {
    return (
        <div className={styles.content}>
            <Outlet />
            <Footer />
        </div>
    )
}
