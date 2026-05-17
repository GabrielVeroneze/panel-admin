import { TimelineSection } from './TimelineSection/TimelineSection'
import styles from './ProfileTimeline.module.scss'

type TimelineItem = {
    id: number
    image: string
    title: string
    subtitle: string
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
            <TimelineSection title="Experience" items={experienceList} />
            <TimelineSection title="Education" items={educationList} />
        </section>
    )
}
