import { useState, type ReactNode } from 'react'
import styles from './NavItemExpandable.module.scss'

type NavItemExpandableProps = {
    label: string
    icon?: ReactNode
    children: ReactNode
}

export const NavItemExpandable = ({
    label,
    children,
    icon,
}: NavItemExpandableProps) => {
    const [openItem, setOpenItem] = useState<string | null>(null)

    const handleToggle = () => {
        setOpenItem((prev) => (prev === label ? null : label))
    }

    return (
        <li
            className={`
                ${styles.item}
                ${openItem === label ? styles.expanded : ''}
            `}
        >
            <button className={styles.button} onClick={handleToggle}>
                {icon}
                <span>{label}</span>
            </button>
            <ul className={styles.submenu} hidden={!openItem}>
                {children}
            </ul>
        </li>
    )
}
