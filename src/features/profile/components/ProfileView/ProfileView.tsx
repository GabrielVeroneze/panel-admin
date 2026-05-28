import {
    ProfileActivityFeed,
    ProfileSidebar,
    ProfileTimeline,
} from '@/features/profile/components'
import type { UserProfile } from '@/features/profile/types'
import styles from './ProfileView.module.scss'

type ProfileViewProps = {
    profile: UserProfile
}

export const ProfileView = ({ profile }: ProfileViewProps) => {
    return (
        <section className={styles.layout}>
            <ProfileSidebar profile={profile} />
            <ProfileActivityFeed profile={profile} />
            <ProfileTimeline profile={profile} />
        </section>
    )
}
