import { beforeEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useEditProductForm } from './useEditProductForm'
import { mapProductToUpdateFormValues } from '../mappers'
import type { Product } from '../types'

vi.mock('../mappers', () => ({
    mapProductToUpdateFormValues: vi.fn(),
}))

const product: Product = {
    id: 1,
    name: 'Product',
    category: 'Category',
    brand: 'Brand',
    price: 100,
    description: 'Product description',
    images: ['product.jpg'],
}

describe('useEditProductForm', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('returns the expected default values when no product is provided', () => {
        const { result } = renderHook(() => useEditProductForm())

        expect(result.current.getValues()).toEqual({
            name: '',
            category: '',
            brand: '',
            price: 0,
            details: '',
            images: [],
        })
    })

    it('returns the expected default values when product is null', () => {
        const { result } = renderHook(() => useEditProductForm(null))

        expect(result.current.getValues()).toEqual({
            name: '',
            category: '',
            brand: '',
            price: 0,
            details: '',
            images: [],
        })
    })

    it('maps the product to form values when a product is provided', () => {
        const mappedValues = {
            name: 'Product',
            category: 'Category',
            brand: 'Brand',
            price: 100,
            details: 'Product description',
            images: [],
        }

        vi.mocked(mapProductToUpdateFormValues).mockReturnValue(mappedValues)

        const { result } = renderHook(() => useEditProductForm(product))

        expect(mapProductToUpdateFormValues).toHaveBeenCalledTimes(1)
        expect(mapProductToUpdateFormValues).toHaveBeenCalledWith(product)
        expect(result.current.getValues()).toEqual(mappedValues)
    })

    it('does not map a product when no product is provided', () => {
        const { result } = renderHook(() => useEditProductForm())

        expect(mapProductToUpdateFormValues).not.toHaveBeenCalled()

        expect(result.current.getValues()).toEqual({
            name: '',
            category: '',
            brand: '',
            price: 0,
            details: '',
            images: [],
        })
    })

    it('does not map a product when product is null', () => {
        const { result } = renderHook(() => useEditProductForm(null))

        expect(mapProductToUpdateFormValues).not.toHaveBeenCalled()

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
        const { result } = renderHook(() => useEditProductForm())

        expect(result.current.formState.errors).toEqual({})
    })

    it('accepts valid form values without images', async () => {
        const { result } = renderHook(() => useEditProductForm())

        act(() => {
            result.current.reset({
                name: 'Product',
                category: 'Category',
                brand: 'Brand',
                price: 100,
                details: 'Product description',
                images: [],
            })
        })

        let isValid = false

        await act(async () => {
            isValid = await result.current.trigger()
        })

        expect(isValid).toBe(true)
    })

    it('accepts valid form values with images', async () => {
        const { result } = renderHook(() => useEditProductForm())

        const image = new File(['image'], 'product.jpg', {
            type: 'image/jpeg',
        })

        act(() => {
            result.current.reset({
                name: 'Product',
                category: 'Category',
                brand: 'Brand',
                price: 100,
                details: 'Product description',
                images: [image],
            })
        })

        let isValid = false

        await act(async () => {
            isValid = await result.current.trigger()
        })

        expect(isValid).toBe(true)
    })
})
