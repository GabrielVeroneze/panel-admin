import { Switch } from '@/shared/components'
import type { SettingsToggle } from '@/features/settings/types'
import styles from './SettingsToggleItem.module.scss'

type SettingsToggleItemProps = {
    setting: SettingsToggle
}

export const SettingsToggleItem = ({ setting }: SettingsToggleItemProps) => {
    return (
        <div className={styles.item}>
            <div className={styles.content}>
                <h4 className={styles.label}>{setting.label}</h4>
                <p className={styles.description}>{setting.description}</p>
            </div>
            <Switch checked={setting.enabled} size="large" />
        </div>
    )
}
