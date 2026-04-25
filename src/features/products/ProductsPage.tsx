import { useState } from 'react'
import { DataTableFooter, DataTableToolbar } from '@/shared/components'
import { ProductsTable } from './components'
import { useProducts } from './hooks'
import styles from '@/styles/layouts/page.module.scss'

export const ProductsPage = () => {
    const [page, setPage] = useState<number>(1)
    const pageSize = 15

    const { productsList, total, loading } = useProducts(page, pageSize)

    return (
        <section className={styles.page}>
            <DataTableToolbar
                searchPlaceholder="Search for products"
                createLabel="Add Product"
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
