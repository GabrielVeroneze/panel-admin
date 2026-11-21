import { useAppDispatch } from '@/store'
import { useFormModal, usePaginationFilters } from '@/shared/hooks'
import { Toast } from '@/shared/lib'
import {
    clearCreateError,
    createProduct,
    deleteProduct,
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
    } = useProducts(filters.page, pageSize, filters.search)

    const handleEdit = (productId: number) => {
        const product = products.find((product) => product.id === productId)
        if (!product) return

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

        await dispatch(
            updateProduct({
                id: modal.editingItem.id,
                payload: mapFormToUpdatePayload(data),
            }),
        )

        modal.close()
    }

    const handleDeleteProduct = async () => {
        if (!modal.editingItem) return

        await dispatch(
            deleteProduct({
                id: modal.editingItem.id,
            }),
        )

        modal.close()
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
        handleOpenCreate,
        createLoading,
        createError,
    }
}
