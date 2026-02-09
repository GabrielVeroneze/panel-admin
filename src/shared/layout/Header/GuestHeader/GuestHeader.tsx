import { Link } from 'react-router'
import { NavItem } from '@/shared/components'
import { LoginIcon } from '@/shared/icons'
import styles from './GuestHeader.module.scss'

const navItems = [
    { label: 'Dashboard', to: '/' },
    { label: 'Team', to: '/team' },
    { label: 'Projects', to: '/projects' },
    { label: 'Calendar', to: '/calendar' },
]

export const GuestHeader = () => {
    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <ul className={styles.list}>
                    {navItems.map((item) => (
                        <NavItem
                            key={item.label}
                            className={styles.item}
                            {...item}
                        />
                    ))}
                </ul>
            </nav>
            <Link to="/auth/sign-up" className={styles.link}>
                <LoginIcon />
                <span>Login/Register</span>
            </Link>
        </div>
    )
}
