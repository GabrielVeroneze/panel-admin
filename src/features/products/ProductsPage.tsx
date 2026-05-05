import { DataTableFooter, DataTableToolbar } from '@/shared/components'
import {
    CreateProductModal,
    EditProductModal,
    ProductsTable,
} from './components'
import { useProductsPage } from './hooks'
import styles from '@/styles/layouts/page.module.scss'

export const ProductsPage = () => {
    const {
        filters,
        pageSize,
        productsList,
        total,
        loading,
        modal,
        handleEdit,
        handleCreateSubmit,
        handleUpdateSubmit,
    } = useProductsPage()

    return (
        <section className={styles.page}>
            <DataTableToolbar
                search={filters.search}
                searchPlaceholder="Search for products"
                createLabel="Add Product"
                onSearchChange={filters.handleSearchChange}
                onCreate={modal.openCreate}
            />
            <ProductsTable
                products={productsList}
                loading={loading}
                onEdit={handleEdit}
            />
            <DataTableFooter
                label="products"
                page={filters.page}
                pageSize={pageSize}
                total={total}
                onPageChange={filters.setPage}
            />
            {modal.isCreateOpen && (
                <CreateProductModal
                    open
                    onCreate={handleCreateSubmit}
                    onClose={modal.close}
                />
            )}
            {modal.isEditOpen && modal.editingItem && (
                <EditProductModal
                    open
                    product={modal.editingItem}
                    onUpdate={handleUpdateSubmit}
                    onClose={modal.close}
                    onDelete={() => console.log('delete', modal.editingItem)}
                />
            )}
        </section>
    )
}
