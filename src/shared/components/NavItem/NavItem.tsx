import { NavLink } from 'react-router'
import type { ReactNode } from 'react'
import clsx from 'clsx'
import styles from './NavItem.module.scss'

type NavItemProps = {
    to: string
    label: string
    icon?: ReactNode
    className?: string
}

export const NavItem = ({ to, label, icon, className = '' }: NavItemProps) => {
    return (
        <li className={clsx(styles.item, className)}>
            <NavLink
                to={to}
                className={({ isActive }) =>
                    clsx(styles.link, isActive && styles.active)
                }
            >
                {icon && <span className={styles.icon}>{icon}</span>}
                <span>{label}</span>
            </NavLink>
        </li>
    )
}
