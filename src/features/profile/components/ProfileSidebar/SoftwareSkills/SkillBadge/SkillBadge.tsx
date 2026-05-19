import { softwareIcons } from '@/shared/assets/software-icons/registry'
import styles from './SkillBadge.module.scss'

type SkillBadgeProps = {
    id: string
    label: string
}

export const SkillBadge = ({ id, label }: SkillBadgeProps) => {
    const Icon = softwareIcons[id]

    if (!Icon) return null

    return (
        <div className={styles.badge}>
            <Icon className={styles.icon} />
            <span className={styles.label}>{label}</span>
        </div>
    )
}
