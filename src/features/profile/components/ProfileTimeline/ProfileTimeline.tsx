import { AcademicCapIcon, BriefcaseIcon } from '@/shared/assets/icons'
import { TimelineSection } from './TimelineSection/TimelineSection'
import type { UserProfile } from '@/features/profile/types'
import styles from './ProfileTimeline.module.scss'

type ProfileTimelineProps = {
    profile: UserProfile
}

export const ProfileTimeline = ({ profile }: ProfileTimelineProps) => {
    return (
        <section className={styles.timeline}>
            <TimelineSection
                icon={<BriefcaseIcon />}
                title="Experience"
                items={profile.experience}
            />
            <TimelineSection
                icon={<AcademicCapIcon />}
                title="Education"
                items={profile.education}
            />
        </section>
    )
}
