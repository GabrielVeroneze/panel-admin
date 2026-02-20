import { useState, type ReactNode } from 'react'
import clsx from 'clsx'
import styles from './Dropdown.module.scss'

type DropdownProps = {
    children: ReactNode
    trigger: ReactNode
    align?: 'left' | 'right'
}

export const Dropdown = ({
    children,
    trigger,
    align = 'right',
}: DropdownProps) => {
    const [open, setOpen] = useState<boolean>(true)

    const toggle = () => setOpen((prev) => !prev)

    return (
        <div className={styles.container}>
            <button
                className={styles.trigger}
                type="button"
                onClick={toggle}
                aria-expanded={open}
            >
                {trigger}
            </button>
            {open && (
                <ul className={clsx(styles.dropdown, styles[align])}>
                    {children}
                </ul>
            )}
        </div>
    )
}
