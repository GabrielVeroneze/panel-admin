import { SystemView } from '@/shared/components'
import { NotFoundImage } from '@/shared/assets/images'

export const NotFoundPage = () => {
    return (
        <SystemView
            image={NotFoundImage}
            title="Page Not Found"
            description="Sorry, we couldn't find the page you're looking for. It may have been moved, deleted, or the URL might be incorrect."
            action={{
                label: 'Back to Dashboard',
                to: '/',
            }}
        />
    )
}
