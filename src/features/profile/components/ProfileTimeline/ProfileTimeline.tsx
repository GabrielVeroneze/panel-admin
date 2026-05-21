import { ExperienceSection } from './ExperienceSection/ExperienceSection'
import { EducationSection } from './EducationSection/EducationSection'
import type { TimelineEntry } from '@/features/profile/types'
import styles from './ProfileTimeline.module.scss'

type ProfileTimelineProps = {
    experienceList: TimelineEntry[]
    educationList: TimelineEntry[]
}

export const ProfileTimeline = ({
    experienceList,
    educationList,
}: ProfileTimelineProps) => {
    return (
        <section className={styles.timeline}>
            <ExperienceSection experienceList={experienceList} />
            <EducationSection educationList={educationList} />
        </section>
    )
}
