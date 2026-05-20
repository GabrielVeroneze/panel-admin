import { BriefcaseIcon } from '@/shared/assets/icons'
import { ProfileSectionCard } from '@/features/profile/components'
import { TimelineItem } from '../TimelineItem/TimelineItem'

type Experience = {
    id: number
    period: string
    title: string
    organization: string
    description: string
}

type ExperienceSectionProps = {
    experienceList: Experience[]
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
                <TimelineItem
                    key={experience.id}
                    period={experience.period}
                    title={experience.title}
                    organization={experience.organization}
                    description={experience.description}
                />
            ))}
        </ProfileSectionCard>
    )
}
