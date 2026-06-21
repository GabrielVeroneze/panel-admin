import { Switch } from '@/shared/components'
import type { SettingsToggle } from '@/features/settings/types'
import styles from './SettingsToggleItem.module.scss'

type SettingsToggleItemProps = SettingsToggle

export const SettingsToggleItem = ({
    label,
    description,
    enabled,
    onChange,
}: SettingsToggleItemProps) => {
    return (
        <div className={styles.item}>
            <div className={styles.content}>
                <h4 className={styles.label}>{label}</h4>
                <p className={styles.description}>{description}</p>
            </div>
            <Switch size="large" checked={enabled} onChange={onChange} />
        </div>
    )
}
