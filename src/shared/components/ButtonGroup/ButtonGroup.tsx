import type { ReactNode } from 'react'
import styles from './ButtonGroup.module.scss'

type ButtonGroupProps = {
    children: ReactNode
}

export const ButtonGroup = ({ children }: ButtonGroupProps) => {
    return <div className={styles.group}>{children}</div>
}
