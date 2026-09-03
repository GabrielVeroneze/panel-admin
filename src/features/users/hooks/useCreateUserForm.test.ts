import { describe, expect, it } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useCreateUserForm } from './useCreateUserForm'

describe('useCreateUserForm', () => {
    it('returns the form instance', () => {
        const { result } = renderHook(() => useCreateUserForm())

        expect(result.current).toBeDefined()
        expect(result.current.register).toBeTypeOf('function')
        expect(result.current.handleSubmit).toBeTypeOf('function')
        expect(result.current.reset).toBeTypeOf('function')
        expect(result.current.setValue).toBeTypeOf('function')
        expect(result.current.getValues).toBeTypeOf('function')
    })

    it('initializes the form with default values', () => {
        const { result } = renderHook(() => useCreateUserForm())

        expect(result.current.getValues()).toEqual({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: '',
            department: '',
            password: '',
            confirmPassword: '',
            avatar: undefined,
        })
    })

    it('accepts valid form values', async () => {
        const { result } = renderHook(() => useCreateUserForm())

        await act(async () => {
            result.current.reset({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                phone: '+5511987654321',
                company: 'Acme',
                department: 'Engineering',
                password: 'Password1!',
                confirmPassword: 'Password1!',
                avatar: undefined,
            })
        })

        let isValid = false

        await act(async () => {
            isValid = await result.current.trigger()
        })

        expect(isValid).toBe(true)
    })

    it('rejects invalid form values', async () => {
        const { result } = renderHook(() => useCreateUserForm())

        await act(async () => {
            result.current.reset({
                firstName: 'A',
                lastName: '',
                email: 'invalid-email',
                phone: 'invalid-phone',
                company: 'A',
                department: 'A',
                password: 'password',
                confirmPassword: 'different',
                avatar: undefined,
            })
        })

        let isValid = true

        await act(async () => {
            isValid = await result.current.trigger()
        })

        expect(isValid).toBe(false)
    })
})
