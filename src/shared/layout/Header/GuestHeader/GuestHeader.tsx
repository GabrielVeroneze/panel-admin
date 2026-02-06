import { Link } from 'react-router'
import { NavItem } from '@/shared/components'
import { LoginIcon } from '@/shared/icons'
import styles from './GuestHeader.module.scss'

const navItems = [
    { label: 'Dashboard', to: '/' },
    { label: 'Team', to: '#' },
    { label: 'Projects', to: '#' },
    { label: 'Calendar', to: '#' },
]

export const GuestHeader = () => {
    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <ul className={styles.list}>
                    {navItems.map((item) => (
                        <NavItem key={item.label} {...item} />
                    ))}
                </ul>
            </nav>
            <Link to="#" className={styles.link}>
                <LoginIcon />
                <span>Login/Register</span>
            </Link>
        </div>
    )
}
