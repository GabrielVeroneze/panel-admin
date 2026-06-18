import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchSettings } from '../store'

export const useSettings = () => {
    const dispatch = useAppDispatch()

    const { settings, loading } = useAppSelector((state) => state.settings)

    useEffect(() => {
        dispatch(fetchSettings())
    }, [dispatch])

    return {
        settings,
        loading,
    }
}
