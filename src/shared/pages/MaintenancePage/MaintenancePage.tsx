import { SystemView } from '@/shared/components'
import { MaintenanceImage } from '@/shared/assets/images'

export const MaintenancePage = () => {
    return (
        <SystemView
            image={MaintenanceImage}
            title="Under Maintenance"
            description="We're performing scheduled maintenance to improve our services. The application will be available again shortly. Thank you for your patience."
            action={{
                label: 'Refresh',
                onClick: () => window.location.reload(),
            }}
        />
    )
}
