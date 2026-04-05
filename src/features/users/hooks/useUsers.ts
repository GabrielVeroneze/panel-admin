import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchUsers, selectUsersList } from '../store'

export const useUsers = (page: number, pageSize: number) => {
    const dispatch = useAppDispatch()

    const { data, loading } = useAppSelector((state) => state.users)
    const usersList = useAppSelector(selectUsersList)

    useEffect(() => {
        dispatch(fetchUsers({ page, pageSize }))
    }, [dispatch, page, pageSize])

    const users = data?.list ?? []
    const total = data?.total ?? 0
    const currentPage = data?.page ?? page
    const currentPageSize = data?.pageSize ?? pageSize

    return {
        users,
        usersList,
        total,
        page: currentPage,
        pageSize: currentPageSize,
        loading,
    }
}
