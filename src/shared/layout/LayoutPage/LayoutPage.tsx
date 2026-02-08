import { useState } from 'react'
import { Outlet } from 'react-router'
import { Header, Sidebar } from '@/shared/layout'
import styles from './LayoutPage.module.scss'

export const LayoutPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
    const isAuth = false

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev)
    }

    return (
        <div className={styles.layout}>
            <Header isAuthenticated={isAuth} onToggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isSidebarOpen} />
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    )
}
