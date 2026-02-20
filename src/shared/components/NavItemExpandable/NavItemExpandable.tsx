import { useState, type ReactNode } from 'react'
import clsx from 'clsx'
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

    const isExpanded = openItem === label

    const handleToggle = () => {
        setOpenItem((prev) => (prev === label ? null : label))
    }

    return (
        <li className={clsx(styles.item, isExpanded && styles.expanded)}>
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
