import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
    const form = useForm<GeneralInformationFormValues>({
        resolver: zodResolver(generalInformationSchema),
        defaultValues: data ?? defaultValues,
        mode: 'onTouched',
    })

    return form
}
