import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchProducts, selectProductsList } from '../store'

export const useProducts = (
    page: number,
    pageSize: number,
    search?: string,
) => {
    const dispatch = useAppDispatch()

    const { data, loading } = useAppSelector((state) => state.products)
    const productsList = useAppSelector(selectProductsList)

    useEffect(() => {
        dispatch(fetchProducts({ page, pageSize, search }))
    }, [dispatch, page, pageSize, search])

    const products = data?.list ?? []
    const total = data?.total ?? 0
    const currentPage = data?.page ?? page
    const currentPageSize = data?.pageSize ?? pageSize

    return {
        products,
        productsList,
        total,
        page: currentPage,
        pageSize: currentPageSize,
        loading,
    }
}
