import { useFormContext, useFormState } from 'react-hook-form'
import { FormField, Input } from '@/shared/components'
import type { BaseUserFieldsValues } from '@/features/users/schemas'
import styles from './CommonUserFields.module.scss'

export const CommonUserFields = () => {
    const { register, control } = useFormContext<BaseUserFieldsValues>()
    const { errors } = useFormState({ control })

    return (
        <>
            <FormField
                id="first-name"
                label="First Name"
                size="large"
                status={errors.firstName && 'error'}
                message={errors.firstName?.message}
            >
                <Input
                    className={styles.input}
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
                    className={styles.input}
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
                    className={styles.input}
                    type="email"
                    placeholder="Enter email address"
                    size="large"
                    {...register('email')}
                />
            </FormField>
            <FormField
                id="phone"
                label="Phone number"
                size="large"
                status={errors.phone && 'error'}
                message={errors.phone?.message}
            >
                <Input
                    className={styles.input}
                    type="text"
                    placeholder="Enter phone number +(123) 456 7890"
                    size="large"
                    {...register('phone')}
                />
            </FormField>
            <FormField
                id="company"
                label="Company"
                size="large"
                status={errors.company && 'error'}
                message={errors.company?.message}
            >
                <Input
                    className={styles.input}
                    type="text"
                    placeholder="Enter company name"
                    size="large"
                    {...register('company')}
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
                    className={styles.input}
                    type="text"
                    placeholder="Enter department name"
                    size="large"
                    {...register('department')}
                />
            </FormField>
        </>
    )
}
