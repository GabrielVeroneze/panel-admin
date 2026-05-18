import { Card } from '@/shared/components'
import { SkillBadge } from './SkillBadge/SkillBadge'
import styles from './SoftwareSkills.module.scss'

type Skill = {
    id: string
    label: string
}

type SoftwareSkillsProps = {
    skills: Skill[]
}

export const SoftwareSkills = ({ skills }: SoftwareSkillsProps) => {
    return (
        <Card className={styles.container}>
            <h3 className={styles.title}>Software Skills</h3>
            <div className={styles.skills}>
                {skills.map((skill) => (
                    <SkillBadge
                        key={skill.id}
                        id={skill.id}
                        label={skill.label}
                    />
                ))}
            </div>
        </Card>
    )
}
