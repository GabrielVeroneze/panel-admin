import { useMyProfile } from '@/features/profile/hooks'
import { ProfileView } from '@/features/profile/components'

export const MyProfilePage = () => {
    const { profile, loading } = useMyProfile()

    return <ProfileView profile={profile} loading={loading} />
}
