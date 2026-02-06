import { NavLink } from 'react-router'
import styles from './NavItem.module.scss'

type NavItemProps = {
    to: string
    label: string
}

export const NavItem = ({ to, label }: NavItemProps) => {
    return (
        <li className={styles.item}>
            <NavLink to={to} className={styles.link}>
                <span>{label}</span>
            </NavLink>
        </li>
    )
}
