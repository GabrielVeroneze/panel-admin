import { DataTableFooter, DataTableToolbar } from '@/shared/components'
import { ProductsTable } from './components'
import styles from '@/styles/layouts/page.module.scss'

export const ProductsPage = () => {
    return (
        <section className={styles.page}>
            <DataTableToolbar
                searchPlaceholder="Search for products"
                createLabel="Add Product"
            />
            <ProductsTable products={productsMock} loading={false} />
            <DataTableFooter label="products" />
        </section>
    )
}
