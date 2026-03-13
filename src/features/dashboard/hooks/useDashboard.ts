import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchDashboard } from '../store'

export const useDashboard = () => {
    const dispatch = useAppDispatch()

    const { data, loading } = useAppSelector((state) => state.dashboard)

    useEffect(() => {
        dispatch(fetchDashboard())
    }, [dispatch])

    return {
        data,
        loading,
    }
}
