import { useState } from 'react'

export const useProductsFilters = () => {
    const [page, setPage] = useState<number>(1)
    const [search, setSearch] = useState<string>('')

    const handleSearchChange = (value: string) => {
        setSearch(value)
        setPage(1)
    }

    return {
        page,
        search,
        setPage,
        handleSearchChange,
    }
}
