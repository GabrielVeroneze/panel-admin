import { Link } from 'react-router'
import { Button, Checkbox, FormField, Input } from '@/shared/components'
import { useSignUpForm } from '@/features/auth/hooks'
import styles from './SignUpForm.module.scss'

export const SignUpForm = () => {
    const { form, loading, error, onSubmit } = useSignUpForm()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <FormField
                id="name"
                label="Full Name"
                size="large"
                status={errors.name && 'error'}
                message={errors.name?.message}
            >
                <Input
                    placeholder="Enter your full name"
                    size="large"
                    {...register('name')}
                />
            </FormField>
            <FormField
                id="email"
                label="Your Email"
                size="large"
                status={errors.email && 'error'}
                message={errors.email?.message}
            >
                <Input
                    type="email"
                    size="large"
                    placeholder="Enter your email"
                    {...register('email')}
                />
            </FormField>
            <FormField
                id="password"
                label="Password"
                size="large"
                status={errors.password && 'error'}
                message={errors.password?.message}
            >
                <Input
                    type="password"
                    size="large"
                    placeholder="Enter your password"
                    {...register('password')}
                />
            </FormField>
            <FormField
                id="confirm-password"
                label="Confirm Password"
                size="large"
                status={errors.confirmPassword && 'error'}
                message={errors.confirmPassword?.message}
            >
                <Input
                    type="password"
                    size="large"
                    placeholder="Confirm your password"
                    {...register('confirmPassword')}
                />
            </FormField>
            <Checkbox
                label="I accept the Terms & Conditions"
                {...register('terms')}
            />
            {error && <p className={styles.error}>{error}</p>}
            <Button type="submit" size="lg" loading={loading}>
                Create account
            </Button>
            <p className={styles.footer}>
                Already have an account?{' '}
                <Link className={styles.link} to="/auth/sign-in">
                    Sign In
                </Link>
            </p>
        </form>
    )
}
