import { SystemView } from '@/shared/components'
import { ServerErrorImage } from '@/shared/assets/images'

export const ErrorPage = () => {
    return (
        <SystemView
            image={ServerErrorImage}
            title="Something went wrong"
            description="An unexpected error occurred while processing your request. Please try again. If the problem persists, return to the dashboard and try again later."
            action={{
                label: 'Try Again',
                onClick: () => window.location.reload(),
            }}
        />
    )
}
