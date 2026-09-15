import { describe, expect, it } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useCreateProductForm } from './useCreateProductForm'

describe('useCreateProductForm', () => {
    it('returns the expected default values', () => {
        const { result } = renderHook(() => useCreateProductForm())

        expect(result.current.getValues()).toEqual({
            name: '',
            category: '',
            brand: '',
            price: 0,
            details: '',
            images: [],
        })
    })

    it('starts with no validation errors', () => {
        const { result } = renderHook(() => useCreateProductForm())

        expect(result.current.formState.errors).toEqual({})
    })

    it('rejects invalid form values', async () => {
        const { result } = renderHook(() => useCreateProductForm())

        await act(async () => {
            result.current.setValue('name', 'P')
            result.current.setValue('category', 'C')
            result.current.setValue('brand', 'B')
            result.current.setValue('price', -1)
            result.current.setValue('details', 'Test')
            result.current.setValue('images', [])

            const isValid = await result.current.trigger()

            expect(isValid).toBe(false)
        })
    })

    it('accepts valid form values', async () => {
        const { result } = renderHook(() => useCreateProductForm())

        const image = new File(['image'], 'product.jpg', {
            type: 'image/jpeg',
        })

        await act(async () => {
            result.current.setValue('name', 'Product')
            result.current.setValue('category', 'Category')
            result.current.setValue('brand', 'Brand')
            result.current.setValue('price', 100)
            result.current.setValue(
                'details',
                'This is a valid product description.',
            )
            result.current.setValue('images', [image])

            const isValid = await result.current.trigger()

            expect(isValid).toBe(true)
        })
    })

    it('exposes the form methods required to manage the form', () => {
        const { result } = renderHook(() => useCreateProductForm())

        expect(result.current.register).toBeDefined()
        expect(result.current.handleSubmit).toBeDefined()
        expect(result.current.setValue).toBeDefined()
        expect(result.current.getValues).toBeDefined()
        expect(result.current.trigger).toBeDefined()
        expect(result.current.reset).toBeDefined()
    })
})
