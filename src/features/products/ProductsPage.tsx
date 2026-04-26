import { DataTableFooter, DataTableToolbar } from '@/shared/components'
import { usePaginationFilters } from '@/shared/hooks'
import { ProductsTable } from './components'
import { useProducts } from './hooks'
import styles from '@/styles/layouts/page.module.scss'

export const ProductsPage = () => {
    const pageSize = 15

    const { page, search, setPage, handleSearchChange } = usePaginationFilters()
    const { productsList, total, loading } = useProducts(page, pageSize, search)

    return (
        <section className={styles.page}>
            <DataTableToolbar
                search={search}
                searchPlaceholder="Search for products"
                createLabel="Add Product"
                onSearchChange={handleSearchChange}
            />
            <ProductsTable products={productsList} loading={loading} />
            <DataTableFooter
                label="products"
                page={page}
                pageSize={pageSize}
                total={total}
                onPageChange={setPage}
            />
        </section>
    )
}
