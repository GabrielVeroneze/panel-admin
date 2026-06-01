import { TimelineSectionSkeleton } from './TimelineSection/TimelineSectionSkeleton'
import styles from './ProfileTimeline.module.scss'

export const ProfileTimelineSkeleton = () => {
    return (
        <section className={styles.timeline}>
            <TimelineSectionSkeleton />
            <TimelineSectionSkeleton />
        </section>
    )
}
