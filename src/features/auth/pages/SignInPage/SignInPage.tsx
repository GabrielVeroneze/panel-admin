import { AuthCard, SignInForm } from '@/features/auth/components'
import { SignInImage } from '@/shared/assets/images'

export const SignInPage = () => {
    return (
        <AuthCard
            title="Sign In"
            image={SignInImage}
            imageAlt="Sign in illustration"
        >
            <SignInForm />
        </AuthCard>
    )
}
