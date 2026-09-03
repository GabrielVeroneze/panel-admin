import { describe, expect, it } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useEditUserForm } from './useEditUserForm'
import type { User } from '../types'

const user: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+5511987654321',
    image: 'https://example.com/john.jpg',
    department: 'Engineering',
    company: 'Acme',
    country: 'Brazil',
    status: 'active',
}

describe('useEditUserForm', () => {
    it('returns the form instance', () => {
        const { result } = renderHook(() => useEditUserForm())

        expect(result.current).toBeDefined()
        expect(result.current.register).toBeTypeOf('function')
        expect(result.current.handleSubmit).toBeTypeOf('function')
        expect(result.current.reset).toBeTypeOf('function')
        expect(result.current.setValue).toBeTypeOf('function')
        expect(result.current.getValues).toBeTypeOf('function')
    })

    it('initializes the form with default values when user is not provided', () => {
        const { result } = renderHook(() => useEditUserForm())

        expect(result.current.getValues()).toEqual({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: '',
            department: '',
            currentPassword: '',
            newPassword: '',
            avatar: undefined,
        })
    })

    it('initializes the form with default values when user is null', () => {
        const { result } = renderHook(() => useEditUserForm(null))

        expect(result.current.getValues()).toEqual({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: '',
            department: '',
            currentPassword: '',
            newPassword: '',
            avatar: undefined,
        })
    })

    it('initializes the form with values mapped from the user', () => {
        const { result } = renderHook(() => useEditUserForm(user))

        expect(result.current.getValues()).toEqual({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            phone: '+5511987654321',
            company: 'Acme',
            department: 'Engineering',
        })
    })

    it('does not initialize password fields from the user', () => {
        const { result } = renderHook(() => useEditUserForm(user))

        const values = result.current.getValues()

        expect(values).not.toHaveProperty('password')
        expect(values).not.toHaveProperty('confirmPassword')
        expect(values.currentPassword).toBeUndefined()
        expect(values.newPassword).toBeUndefined()
    })

    it('validates fields with the update user schema', async () => {
        const { result } = renderHook(() => useEditUserForm())

        let isValid = true

        await act(async () => {
            result.current.setValue('firstName', 'A')

            isValid = await result.current.trigger('firstName')
        })

        expect(isValid).toBe(false)
    })

    it('accepts valid form values', async () => {
        const { result } = renderHook(() => useEditUserForm())

        act(() => {
            result.current.reset({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                phone: '+5511987654321',
                company: 'Acme',
                department: 'Engineering',
                currentPassword: '',
                newPassword: '',
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
        const { result } = renderHook(() => useEditUserForm())

        act(() => {
            result.current.reset({
                firstName: 'A',
                lastName: '',
                email: 'invalid-email',
                phone: 'invalid-phone',
                company: 'A',
                department: 'A',
                currentPassword: '',
                newPassword: '',
                avatar: undefined,
            })
        })

        let isValid = true

        await act(async () => {
            isValid = await result.current.trigger()
        })

        expect(isValid).toBe(false)
    })

    it('uses the mapped user values only on initialization', () => {
        const { result, rerender } = renderHook(
            ({ currentUser }) => useEditUserForm(currentUser),
            {
                initialProps: {
                    currentUser: user,
                },
            },
        )

        expect(result.current.getValues()).toEqual({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            phone: '+5511987654321',
            company: 'Acme',
            department: 'Engineering',
        })

        const updatedUser: User = {
            ...user,
            name: 'Jane Smith',
            email: 'jane@example.com',
        }

        rerender({
            currentUser: updatedUser,
        })

        expect(result.current.getValues()).toEqual({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            phone: '+5511987654321',
            company: 'Acme',
            department: 'Engineering',
        })
    })
})
