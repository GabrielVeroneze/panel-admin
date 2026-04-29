import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createProductSchema, type CreateProductFormValues } from '../schemas'

const defaultValues: CreateProductFormValues = {
    name: '',
    category: '',
    brand: '',
    price: 0,
    details: '',
    images: [],
}

export const useCreateProductForm = () => {
    const form = useForm<CreateProductFormValues>({
        resolver: zodResolver(createProductSchema),
        defaultValues: defaultValues,
        mode: 'onTouched',
    })

    return form
}
