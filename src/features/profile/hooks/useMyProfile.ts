import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchMyProfile } from '../store'

export const useMyProfile = () => {
    const dispatch = useAppDispatch()

    const { myProfile, loading } = useAppSelector((state) => state.profile)

    useEffect(() => {
        dispatch(fetchMyProfile())
    }, [dispatch])

    return {
        profile: myProfile,
        loading,
    }
}
