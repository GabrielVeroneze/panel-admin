import { NavLink } from 'react-router'
import type { ReactNode } from 'react'
import styles from './NavItem.module.scss'

type NavItemProps = {
    to: string
    label: string
    icon?: ReactNode
    className?: string
}

export const NavItem = ({ to, label, icon, className = '' }: NavItemProps) => {
    return (
        <li className={`${styles.item} ${className}`}>
            <NavLink to={to} className={styles.link}>
                {icon && <span className={styles.icon}>{icon}</span>}
                <span>{label}</span>
            </NavLink>
        </li>
    )
}
