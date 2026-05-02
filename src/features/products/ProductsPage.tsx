import { DataTableFooter, DataTableToolbar } from '@/shared/components'
import { useFormModal, usePaginationFilters } from '@/shared/hooks'
import {
    CreateProductModal,
    EditProductModal,
    ProductsTable,
} from './components'
import { useProducts } from './hooks'
import type { Product } from './types'
import styles from '@/styles/layouts/page.module.scss'

export const ProductsPage = () => {
    const pageSize = 15

    const { page, search, setPage, handleSearchChange } = usePaginationFilters()
    const { productsList, total, loading } = useProducts(page, pageSize, search)

    const modal = useFormModal<Product>()

    return (
        <section className={styles.page}>
            <DataTableToolbar
                search={search}
                searchPlaceholder="Search for products"
                createLabel="Add Product"
                onSearchChange={handleSearchChange}
                onCreate={modal.openCreate}
            />
            <ProductsTable products={productsList} loading={loading} />
            <DataTableFooter
                label="products"
                page={page}
                pageSize={pageSize}
                total={total}
                onPageChange={setPage}
            />
            {modal.isCreateOpen && (
                <CreateProductModal open onClose={modal.close} />
            )}
            {modal.isEditOpen && modal.editingItem && (
                <EditProductModal
                    open
                    product={modal.editingItem}
                    onClose={modal.close}
                    onDelete={() => console.log('delete', modal.editingItem)}
                />
            )}
        </section>
    )
}
