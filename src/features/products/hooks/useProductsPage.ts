import { useAppDispatch } from '@/store'
import { useFormModal, usePaginationFilters } from '@/shared/hooks'
import { Toast } from '@/shared/lib'
import {
    clearCreateError,
    clearDeleteError,
    clearUpdateError,
    createProduct,
    deleteProduct,
    deleteProducts,
    updateProduct,
} from '../store'
import { mapFormToCreatePayload, mapFormToUpdatePayload } from '../mappers'
import { useProducts } from '../hooks'
import type {
    CreateProductFormValues,
    UpdateProductFormValues,
} from '../schemas'
import type { Product } from '../types'

export const useProductsPage = () => {
    const dispatch = useAppDispatch()
    const filters = usePaginationFilters()
    const modal = useFormModal<Product>()

    const pageSize = 15

    const {
        products,
        productsList,
        total,
        loading,
        createLoading,
        createError,
        updateLoading,
        updateError,
        deleteLoading,
        deleteError,
        deleteMultipleLoading,
    } = useProducts(filters.page, pageSize, filters.search)

    const handleEdit = (productId: number) => {
        const product = products.find((product) => product.id === productId)
        if (!product) return

        dispatch(clearUpdateError())
        dispatch(clearDeleteError())

        modal.openEdit(product)
    }

    const handleOpenCreate = () => {
        dispatch(clearCreateError())

        modal.openCreate()
    }

    const handleCreateSubmit = async (data: CreateProductFormValues) => {
        try {
            await dispatch(
                createProduct({
                    payload: mapFormToCreatePayload(data),
                }),
            ).unwrap()

            Toast.success('Product created successfully')
            modal.close()
        } catch {
            return
        }
    }

    const handleUpdateSubmit = async (data: UpdateProductFormValues) => {
        if (!modal.editingItem) return

        try {
            await dispatch(
                updateProduct({
                    id: modal.editingItem.id,
                    payload: mapFormToUpdatePayload(data),
                }),
            ).unwrap()

            Toast.success('Product updated successfully')
            modal.close()
        } catch {
            return
        }
    }

    const handleDeleteProduct = async () => {
        if (!modal.editingItem) return

        try {
            await dispatch(
                deleteProduct({
                    id: modal.editingItem.id,
                }),
            ).unwrap()

            Toast.success('Product deleted successfully')
            modal.close()
        } catch {
            return
        }
    }

    const handleDeleteProducts = async (ids: number[]) => {
        try {
            await dispatch(deleteProducts({ ids })).unwrap()

            Toast.success(
                ids.length === 1
                    ? 'Product deleted successfully'
                    : 'Products deleted successfully',
            )
        } catch (error) {
            Toast.error(
                typeof error === 'string'
                    ? error
                    : 'Unable to delete selected products. Please try again.',
            )

            throw error
        }
    }

    return {
        filters,
        pageSize,
        productsList,
        total,
        loading,
        modal,
        handleEdit,
        handleCreateSubmit,
        handleUpdateSubmit,
        handleDeleteProduct,
        handleDeleteProducts,
        handleOpenCreate,
        createLoading,
        createError,
        updateLoading,
        updateError,
        deleteLoading,
        deleteError,
        deleteMultipleLoading,
    }
}
