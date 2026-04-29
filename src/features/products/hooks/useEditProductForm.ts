import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { mapProductToUpdateFormValues } from '../mappers'
import { updateProductSchema, type UpdateProductFormValues } from '../schemas'
import type { Product } from '../types'

const defaultValues: UpdateProductFormValues = {
    name: '',
    category: '',
    brand: '',
    price: 0,
    details: '',
    images: [],
}

export const useEditProductForm = (product?: Product | null) => {
    const form = useForm<UpdateProductFormValues>({
        resolver: zodResolver(updateProductSchema),
        defaultValues: product
            ? mapProductToUpdateFormValues(product)
            : defaultValues,
        mode: 'onTouched',
    })

    return form
}
