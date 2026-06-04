import { Card, EmptyState } from '@/shared/components'
import { CodeIcon, ExclamationCircleIcon } from '@/shared/assets/icons'
import { ProfileSectionCard } from '@/features/profile/components'
import { SkillBadge } from './SkillBadge/SkillBadge'
import type { Skill } from '@/features/profile/types'
import styles from './SoftwareSkills.module.scss'

type SoftwareSkillsProps = {
    skills: Skill[]
}

export const SoftwareSkills = ({ skills }: SoftwareSkillsProps) => {
    if (!skills || skills.length === 0) {
        return (
            <Card>
                <EmptyState
                    icon={<ExclamationCircleIcon />}
                    title="Skills information unavailable"
                    description="Software skills and technical competencies could not be loaded."
                />
            </Card>
        )
    }

    return (
        <ProfileSectionCard
            variant="compact"
            icon={<CodeIcon />}
            title="Software Skills"
        >
            <div className={styles.skills}>
                {skills.map((skill) => (
                    <SkillBadge
                        key={skill.id}
                        id={skill.id}
                        label={skill.label}
                    />
                ))}
            </div>
        </ProfileSectionCard>
    )
}
