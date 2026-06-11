import { SettingsToggleItem } from './SettingsToggleItem/SettingsToggleItem'
import type { SettingsToggle } from '@/features/settings/types'
import styles from './SettingsToggleList.module.scss'

type SettingsToggleListProps = {
    items: SettingsToggle[]
}

export const SettingsToggleList = ({ items }: SettingsToggleListProps) => {
    return (
        <div className={styles.list}>
            {items.map((item) => (
                <SettingsToggleItem key={item.id} setting={item} />
            ))}
        </div>
    )
}
