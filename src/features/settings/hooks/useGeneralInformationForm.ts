import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch } from '@/store'
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

    const form = useForm<GeneralInformationFormValues>({
        resolver: zodResolver(generalInformationSchema),
        defaultValues: data ?? defaultValues,
        mode: 'onTouched',
    })

    const { handleSubmit } = form

    const onSubmit = handleSubmit(async (values) => {
        await dispatch(saveGeneralInformation(values))
    })

    return {
        ...form,
        onSubmit,
    }
}
