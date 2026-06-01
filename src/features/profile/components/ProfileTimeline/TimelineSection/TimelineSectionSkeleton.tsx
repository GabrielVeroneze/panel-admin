import { ProfileSectionCardSkeleton } from '@/features/profile/components'
import { TimelineItemSkeleton } from '../TimelineItem/TimelineItemSkeleton'

export const TimelineSectionSkeleton = () => {
    const items = Array.from({ length: 3 })

    return (
        <ProfileSectionCardSkeleton>
            {items.map((_, index) => (
                <TimelineItemSkeleton key={index} />
            ))}
        </ProfileSectionCardSkeleton>
    )
}
