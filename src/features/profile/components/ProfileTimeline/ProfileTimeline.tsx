import { ExperienceSection } from './ExperienceSection/ExperienceSection'
import { EducationSection } from './EducationSection/EducationSection'
import styles from './ProfileTimeline.module.scss'

type TimelineItem = {
    id: number
    period: string
    title: string
    organization: string
    description: string
}

type ProfileTimelineProps = {
    experienceList: TimelineItem[]
    educationList: TimelineItem[]
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
