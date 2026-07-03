import { AuthCard, SignUpForm } from '@/features/auth/components'
import { SignUpImage } from '@/shared/assets/images'

export const SignUpPage = () => {
    return (
        <AuthCard
            title="Create Your Account"
            image={SignUpImage}
            imageAlt="Sign up illustration"
        >
            <SignUpForm />
        </AuthCard>
    )
}
