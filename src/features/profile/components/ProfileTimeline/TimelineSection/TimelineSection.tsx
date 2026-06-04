import { Card, EmptyState } from '@/shared/components'
import { ExclamationCircleIcon } from '@/shared/assets/icons'
import { ProfileSectionCard } from '@/features/profile/components'
import { TimelineItem } from '../TimelineItem/TimelineItem'
import type { ReactNode } from 'react'
import type { TimelineEntry } from '@/features/profile/types'

type TimelineSectionProps = {
    icon: ReactNode
    title: string
    items: TimelineEntry[]
}

export const TimelineSection = ({
    icon,
    title,
    items,
}: TimelineSectionProps) => {
    if (!items || items.length === 0) {
        return (
            <Card>
                <EmptyState
                    icon={<ExclamationCircleIcon />}
                    title="Timeline information unavailable"
                    description="Career and education history could not be loaded."
                />
            </Card>
        )
    }

    return (
        <ProfileSectionCard variant="compact" icon={icon} title={title}>
            {items.map((item) => (
                <TimelineItem key={item.id} {...item} />
            ))}
        </ProfileSectionCard>
    )
}
