import { ExperienceSection } from './ExperienceSection/ExperienceSection'
import { EducationSection } from './EducationSection/EducationSection'
import type { ProfileTimelineData } from '@/features/profile/types'
import styles from './ProfileTimeline.module.scss'

type ProfileTimelineProps = {
    timeline: ProfileTimelineData
}

export const ProfileTimeline = ({ timeline }: ProfileTimelineProps) => {
    return (
        <section className={styles.timeline}>
            <ExperienceSection experienceList={timeline.experience} />
            <EducationSection educationList={timeline.education} />
        </section>
    )
}
