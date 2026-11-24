import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch, useAppSelector } from '@/store'
import { Toast } from '@/shared/lib'
import { saveGeneralInformation } from '../store'
import {
    generalInformationSchema,
    type GeneralInformationFormValues,
} from '../schemas'
import type { GeneralInformation } from '../types'

const defaultValues: GeneralInformationFormValues = {
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
}

export const useGeneralInformationForm = (data?: GeneralInformation) => {
    const dispatch = useAppDispatch()

    const generalInformationLoading = useAppSelector(
        (state) => state.settings.generalInformationLoading,
    )

    const form = useForm<GeneralInformationFormValues>({
        resolver: zodResolver(generalInformationSchema),
        values: data ?? defaultValues,
        mode: 'onTouched',
    })

    const { handleSubmit, setError, clearErrors } = form

    const onSubmit = handleSubmit(async (values) => {
        clearErrors('root.server')

        try {
            await dispatch(saveGeneralInformation(values)).unwrap()

            Toast.success('General information updated successfully.')
        } catch (error) {
            setError('root.server', {
                type: 'server',
                message:
                    typeof error === 'string'
                        ? error
                        : 'Unable to update general information. Please try again.',
            })
        }
    })

    return {
        form,
        onSubmit,
        generalInformationLoading,
    }
}
