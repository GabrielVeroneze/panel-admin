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
    return (
        <ProfileSectionCard variant="compact" icon={icon} title={title}>
            {items.map((item) => (
                <TimelineItem key={item.id} {...item} />
            ))}
        </ProfileSectionCard>
    )
}
