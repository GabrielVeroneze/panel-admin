import { Button, Checkbox, FormField, Input } from '@/shared/components'
import { useSignInForm } from '@/features/auth/hooks'
import styles from './SignInForm.module.scss'

export const SignInForm = () => {
    const {
        register,
        handleSubmit,
        onSubmit,
        loading,
        error,
        formState: { errors },
    } = useSignInForm()

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <FormField
                id="email"
                label="Your Email"
                size="large"
                status={errors.email && 'error'}
                message={errors.email?.message}
            >
                <Input
                    type="email"
                    placeholder="Enter your email"
                    size="large"
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
                    placeholder="Enter your password"
                    size="large"
                    {...register('password')}
                />
            </FormField>
            <Checkbox label="Remember me" {...register('rememberMe')} />
            {error && <p className={styles.error}>{error}</p>}
            <Button type="submit" size="lg" loading={loading}>
                Sign In
            </Button>
        </form>
    )
}
