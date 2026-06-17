import type { ReactNode } from 'react'
import styles from './SettingsToggleList.module.scss'

type SettingsToggleListProps = {
    children: ReactNode
}

export const SettingsToggleList = ({ children }: SettingsToggleListProps) => {
    return <div className={styles.list}>{children}</div>
}
