import { beforeEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook, waitFor } from '@testing-library/react'
import { useAppDispatch } from '@/store'
import { saveGeneralInformation } from '../store'
import { useGeneralInformationForm } from './useGeneralInformationForm'
import type { GeneralInformation } from '../types'

vi.mock('@/store', () => ({
    useAppDispatch: vi.fn(),
}))

vi.mock('../store', () => ({
    saveGeneralInformation: vi.fn(),
}))

describe('useGeneralInformationForm', () => {
    const dispatch = vi.fn()

    const saveGeneralInformationAction = {
        type: 'settings/saveGeneralInformation',
    }

    const generalInformation: GeneralInformation = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'Developer',
        phone: '+14155552671',
        birthDate: '1995-06-15',
        organization: 'OpenAI',
        department: 'Engineering',
        address: '123 Main Street',
        city: 'San Francisco',
        country: 'US',
        zipCode: '94105',
    }

    beforeEach(() => {
        vi.clearAllMocks()

        vi.mocked(useAppDispatch).mockReturnValue(dispatch)

        vi.mocked(saveGeneralInformation).mockReturnValue(
            saveGeneralInformationAction as never,
        )
    })

    it('returns the form and onSubmit function', () => {
        const { result } = renderHook(() => useGeneralInformationForm())

        expect(result.current.form).toBeDefined()
        expect(result.current.onSubmit).toEqual(expect.any(Function))
    })

    it('initializes the form with the default values when data is undefined', () => {
        const { result } = renderHook(() => useGeneralInformationForm())

        expect(result.current.form.getValues()).toEqual({
            firstName: '',
            lastName: '',
            email: '',
            role: '',
            phone: '',
            birthDate: '',
            organization: '',
            department: '',
            address: '',
            city: '',
            country: 'US',
            zipCode: '',
        })
    })

    it('initializes the form with the provided data', () => {
        const { result } = renderHook(() =>
            useGeneralInformationForm(generalInformation),
        )

        expect(result.current.form.getValues()).toEqual(generalInformation)
    })

    it('updates the form values when the provided data changes', () => {
        const { result, rerender } = renderHook(
            ({ data }) => useGeneralInformationForm(data),
            {
                initialProps: {
                    data: generalInformation,
                },
            },
        )

        const updatedInformation: GeneralInformation = {
            ...generalInformation,
            firstName: 'Jane',
            email: 'jane.doe@example.com',
        }

        rerender({ data: updatedInformation })

        expect(result.current.form.getValues()).toEqual(updatedInformation)
    })

    it('dispatches saveGeneralInformation when the form is valid', async () => {
        const { result } = renderHook(() =>
            useGeneralInformationForm(generalInformation),
        )

        await act(async () => {
            await result.current.onSubmit()
        })

        expect(saveGeneralInformation).toHaveBeenCalledTimes(1)
        expect(saveGeneralInformation).toHaveBeenCalledWith(generalInformation)

        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith(saveGeneralInformationAction)
    })

    it('normalizes the email before dispatching the form data', async () => {
        const informationWithUppercaseEmail: GeneralInformation = {
            ...generalInformation,
            email: 'JOHN.DOE@EXAMPLE.COM',
        }

        const { result } = renderHook(() =>
            useGeneralInformationForm(informationWithUppercaseEmail),
        )

        await act(async () => {
            await result.current.onSubmit()
        })

        expect(saveGeneralInformation).toHaveBeenCalledWith({
            ...informationWithUppercaseEmail,
            email: 'john.doe@example.com',
        })
    })

    it('does not dispatch when the form contains invalid data', async () => {
        const { result } = renderHook(() => useGeneralInformationForm())

        await act(async () => {
            await result.current.onSubmit()
        })

        expect(dispatch).not.toHaveBeenCalled()
    })

    it('does not dispatch when a required field is invalid', async () => {
        const { result } = renderHook(() =>
            useGeneralInformationForm(generalInformation),
        )

        await act(async () => {
            result.current.form.setValue('firstName', '')
            await result.current.form.trigger('firstName')
        })

        await waitFor(() => {
            expect(result.current.form.formState.errors.firstName).toBeDefined()
        })

        await act(async () => {
            await result.current.onSubmit()
        })

        expect(saveGeneralInformation).not.toHaveBeenCalled()
        expect(dispatch).not.toHaveBeenCalled()
    })

    it('submits the latest values entered into the form', async () => {
        const { result } = renderHook(() =>
            useGeneralInformationForm(generalInformation),
        )

        const updatedInformation: GeneralInformation = {
            ...generalInformation,
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
        }

        act(() => {
            result.current.form.setValue(
                'firstName',
                updatedInformation.firstName,
            )
            result.current.form.setValue(
                'lastName',
                updatedInformation.lastName,
            )
            result.current.form.setValue('email', updatedInformation.email)
        })

        await act(async () => {
            await result.current.onSubmit()
        })

        expect(saveGeneralInformation).toHaveBeenCalledWith(updatedInformation)
    })
})
