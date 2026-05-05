import { useAppDispatch } from '@/store'
import { useDataSelection } from '@/shared/hooks'
import { DataTableFooter, DataTableToolbar } from '@/shared/components'
import {
    CreateProductModal,
    EditProductModal,
    ProductsTable,
} from './components'
import { deleteProducts } from './store'
import { useProductsPage } from './hooks'
import styles from '@/styles/layouts/page.module.scss'

export const ProductsPage = () => {
    const dispatch = useAppDispatch()

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

    const {
        isSelected,
        toggleSelect,
        toggleSelectAll,
        handleDelete,
        allSelected,
        hasSelection,
    } = useDataSelection({
        items: productsList,
        getId: (product) => product.id,
        onDelete: (ids) => dispatch(deleteProducts({ ids })),
    })

    return (
        <section className={styles.page}>
            <DataTableToolbar
                search={filters.search}
                searchPlaceholder="Search for products"
                createLabel="Add Product"
                hasSelection={hasSelection}
                onSearchChange={filters.handleSearchChange}
                onCreate={modal.openCreate}
                onDelete={handleDelete}
            />
            <ProductsTable
                products={productsList}
                loading={loading}
                onEdit={handleEdit}
                isSelected={isSelected}
                onToggleSelect={toggleSelect}
                onToggleSelectAll={toggleSelectAll}
                allSelected={allSelected}
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
