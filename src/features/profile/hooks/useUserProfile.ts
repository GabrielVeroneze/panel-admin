import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchUserProfile } from '../store'

export const useUserProfile = (userId?: string) => {
    const dispatch = useAppDispatch()

    const { userProfile, loading } = useAppSelector((state) => state.profile)

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserProfile({ id: Number(userId) }))
        }
    }, [dispatch, userId])

    return {
        profile: userProfile,
        loading,
    }
}
