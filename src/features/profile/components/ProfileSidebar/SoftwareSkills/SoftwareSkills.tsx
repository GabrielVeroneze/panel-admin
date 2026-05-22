import { CodeIcon } from '@/shared/assets/icons'
import { ProfileSectionCard } from '@/features/profile/components'
import { SkillBadge } from './SkillBadge/SkillBadge'
import type { Skill } from '@/features/profile/types'
import styles from './SoftwareSkills.module.scss'

type SoftwareSkillsProps = {
    skills: Skill[]
}

export const SoftwareSkills = ({ skills }: SoftwareSkillsProps) => {
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
