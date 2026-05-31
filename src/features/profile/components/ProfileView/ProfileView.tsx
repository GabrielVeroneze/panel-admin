import {
    ProfileActivityFeed,
    ProfileSidebar,
    ProfileTimeline,
} from '@/features/profile/components'
import type { UserProfile } from '@/features/profile/types'
import styles from './ProfileView.module.scss'

type ProfileViewProps = {
    profile: UserProfile | null
    loading: boolean
}

export const ProfileView = ({ profile, loading }: ProfileViewProps) => {
    return (
        <section className={styles.layout}>
            <ProfileSidebar profile={profile} loading={loading} />
            <ProfileActivityFeed profile={profile} loading={loading} />
            <ProfileTimeline profile={profile} loading={loading} />
        </section>
    )
}
