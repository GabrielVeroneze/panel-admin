import {
    Button,
    FormField,
    Input,
    Select,
    SelectOption,
} from '@/shared/components'
import { useGeneralInformationForm } from '@/features/settings/hooks'
import { SettingsCard } from '@/features/settings/components'
import { countryOptions } from './countryOptions'
import { GeneralInformationSettingsSkeleton } from './GeneralInformationSettingsSkeleton'
import type { GeneralInformation } from '@/features/settings/types'
import styles from './GeneralInformationSettings.module.scss'

type GeneralInformationSettingsProps = {
    data?: GeneralInformation
    loading: boolean
}

export const GeneralInformationSettings = ({
    data,
    loading,
}: GeneralInformationSettingsProps) => {
    const {
        register,
        onSubmit,
        formState: { errors },
    } = useGeneralInformationForm(data)

    if (loading) return <GeneralInformationSettingsSkeleton />

    if (!data) {
        return null
    }

    return (
        <SettingsCard className={styles.card} title="General information">
            <form className={styles.form} onSubmit={onSubmit}>
                <FormField
                    id="first-name"
                    label="First Name"
                    size="large"
                    status={errors.firstName && 'error'}
                    message={errors.firstName?.message}
                >
                    <Input
                        type="text"
                        placeholder="Enter first name"
                        size="large"
                        {...register('firstName')}
                    />
                </FormField>
                <FormField
                    id="last-name"
                    label="Last Name"
                    size="large"
                    status={errors.lastName && 'error'}
                    message={errors.lastName?.message}
                >
                    <Input
                        type="text"
                        placeholder="Enter last name"
                        size="large"
                        {...register('lastName')}
                    />
                </FormField>
                <FormField
                    id="email"
                    label="Email"
                    size="large"
                    status={errors.email && 'error'}
                    message={errors.email?.message}
                >
                    <Input
                        type="email"
                        placeholder="Enter email"
                        size="large"
                        {...register('email')}
                    />
                </FormField>
                <FormField
                    id="role"
                    label="Role"
                    size="large"
                    status={errors.role && 'error'}
                    message={errors.role?.message}
                >
                    <Input
                        type="text"
                        placeholder="Enter role"
                        size="large"
                        {...register('role')}
                    />
                </FormField>
                <FormField
                    id="phone"
                    label="Phone Number"
                    size="large"
                    status={errors.phone && 'error'}
                    message={errors.phone?.message}
                >
                    <Input
                        type="text"
                        placeholder="Enter phone number"
                        size="large"
                        {...register('phone')}
                    />
                </FormField>
                <FormField
                    id="birth-date"
                    label="Birth Date"
                    size="large"
                    status={errors.birthDate && 'error'}
                    message={errors.birthDate?.message}
                >
                    <Input
                        type="date"
                        size="large"
                        {...register('birthDate')}
                    />
                </FormField>
                <FormField
                    id="organization"
                    label="Organization"
                    size="large"
                    status={errors.organization && 'error'}
                    message={errors.organization?.message}
                >
                    <Input
                        type="text"
                        placeholder="Enter organization"
                        size="large"
                        {...register('organization')}
                    />
                </FormField>
                <FormField
                    id="department"
                    label="Department"
                    size="large"
                    status={errors.department && 'error'}
                    message={errors.department?.message}
                >
                    <Input
                        type="text"
                        placeholder="Enter department"
                        size="large"
                        {...register('department')}
                    />
                </FormField>
                <FormField
                    id="address"
                    label="Address"
                    size="large"
                    status={errors.address && 'error'}
                    message={errors.address?.message}
                >
                    <Input
                        type="text"
                        placeholder="Enter address"
                        size="large"
                        {...register('address')}
                    />
                </FormField>
                <FormField
                    id="city"
                    label="City"
                    size="large"
                    status={errors.city && 'error'}
                    message={errors.city?.message}
                >
                    <Input
                        type="text"
                        placeholder="Enter city"
                        size="large"
                        {...register('city')}
                    />
                </FormField>
                <FormField
                    id="country"
                    label="Country"
                    size="large"
                    status={errors.country && 'error'}
                    message={errors.country?.message}
                >
                    <Select size="medium" {...register('country')}>
                        {countryOptions.map((country) => (
                            <SelectOption
                                key={country.value}
                                value={country.value}
                            >
                                {country.label}
                            </SelectOption>
                        ))}
                    </Select>
                </FormField>
                <FormField
                    id="zip-code"
                    label="Zip Code"
                    size="large"
                    status={errors.zipCode && 'error'}
                    message={errors.zipCode?.message}
                >
                    <Input
                        type="text"
                        placeholder="Enter zip code"
                        size="large"
                        {...register('zipCode')}
                    />
                </FormField>
                <Button className={styles.button} type="submit" size="lg">
                    Update
                </Button>
            </form>
        </SettingsCard>
    )
}
