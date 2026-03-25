import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchUsers } from '../store'

export const useUsers = () => {
    const dispatch = useAppDispatch()

    const { list, loading } = useAppSelector((state) => state.users)

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    return {
        users: list,
        loading,
    }
}
