import { Outlet } from 'react-router'
import { Footer } from '@/shared/layout'
import clsx from 'clsx'
import styles from './PageLayout.module.scss'

type PageLayoutProps = {
    variant?: 'default' | 'plain'
}

export const PageLayout = ({ variant = 'default' }: PageLayoutProps) => {
    return (
        <div className={clsx(styles.content, styles[variant])}>
            <Outlet />
            {variant === 'default' && <Footer />}
        </div>
    )
}
