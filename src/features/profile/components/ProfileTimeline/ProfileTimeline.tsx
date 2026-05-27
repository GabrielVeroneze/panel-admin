import { ExperienceSection } from './ExperienceSection/ExperienceSection'
import { EducationSection } from './EducationSection/EducationSection'
import type { UserProfile } from '@/features/profile/types'
import styles from './ProfileTimeline.module.scss'

type ProfileTimelineProps = {
    profile: UserProfile
}

export const ProfileTimeline = ({ profile }: ProfileTimelineProps) => {
    return (
        <section className={styles.timeline}>
            <ExperienceSection experienceList={profile.experience} />
            <EducationSection educationList={profile.education} />
        </section>
    )
}
