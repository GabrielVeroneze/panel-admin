import { BriefcaseIcon } from '@/shared/assets/icons'
import { ProfileSectionCard } from '@/features/profile/components'
import { TimelineItem } from '../TimelineItem/TimelineItem'
import type { TimelineEntry } from '@/features/profile/types'

type ExperienceSectionProps = {
    experienceList: TimelineEntry[]
}

export const ExperienceSection = ({
    experienceList,
}: ExperienceSectionProps) => {
    return (
        <ProfileSectionCard
            variant="compact"
            icon={<BriefcaseIcon />}
            title="Experience"
        >
            {experienceList.map((experience) => (
                <TimelineItem key={experience.id} {...experience} />
            ))}
        </ProfileSectionCard>
    )
}
