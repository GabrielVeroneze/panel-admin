import { useParams } from 'react-router'
import { useUserProfile } from '@/features/profile/hooks'
import { ProfileView } from '@/features/profile/components'

export const UserProfilePage = () => {
    const { userId } = useParams()
    const { profile, loading } = useUserProfile(userId)

    return <ProfileView profile={profile} loading={loading} />
}
