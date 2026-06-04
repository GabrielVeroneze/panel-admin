import { Card, EmptyState } from '@/shared/components'
import {
    AcademicCapIcon,
    BriefcaseIcon,
    ExclamationCircleIcon,
} from '@/shared/assets/icons'
import { TimelineSection } from './TimelineSection/TimelineSection'
import { ProfileTimelineSkeleton } from './ProfileTimelineSkeleton'
import type { UserProfile } from '@/features/profile/types'
import styles from './ProfileTimeline.module.scss'

type ProfileTimelineProps = {
    profile: UserProfile | null
    loading: boolean
}

export const ProfileTimeline = ({ profile, loading }: ProfileTimelineProps) => {
    if (loading) return <ProfileTimelineSkeleton />

    if (!profile) {
        return (
            <Card className={styles.timeline}>
                <EmptyState
                    icon={<ExclamationCircleIcon />}
                    title="Timeline unavailable"
                    description="Experience and education history could not be loaded."
                />
            </Card>
        )
    }

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
