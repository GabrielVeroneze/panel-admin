import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchUserProfile } from '../store'

export const useUserProfile = (id: number) => {
    const dispatch = useAppDispatch()

    const { userProfile, loading } = useAppSelector((state) => state.profile)

    useEffect(() => {
        dispatch(fetchUserProfile({ id }))
    }, [dispatch, id])

    return {
        profile: userProfile,
        loading,
    }
}
