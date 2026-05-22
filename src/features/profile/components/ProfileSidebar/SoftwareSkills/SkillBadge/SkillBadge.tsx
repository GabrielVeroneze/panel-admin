import { softwareIcons } from '@/shared/assets/software-icons/registry'
import type { Skill } from '@/features/profile/types'
import styles from './SkillBadge.module.scss'

type SkillBadgeProps = Skill

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
