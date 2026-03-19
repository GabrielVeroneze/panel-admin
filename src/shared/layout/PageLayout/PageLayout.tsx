import type { ReactNode } from 'react'
import styles from './PageLayout.module.scss'

type PageLayoutProps = {
    children: ReactNode
}

export const PageLayout = ({ children }: PageLayoutProps) => {
    return <div className={styles.container}>{children}</div>
}
