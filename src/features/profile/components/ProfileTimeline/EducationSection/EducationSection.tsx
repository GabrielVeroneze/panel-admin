import { AcademicCapIcon } from '@/shared/assets/icons'
import { ProfileSectionCard } from '@/features/profile/components'
import { TimelineItem } from '../TimelineItem/TimelineItem'

type Education = {
    id: number
    period: string
    title: string
    organization: string
    description: string
}

type EducationSectionProps = {
    educationList: Education[]
}

export const EducationSection = ({ educationList }: EducationSectionProps) => {
    return (
        <ProfileSectionCard
            variant="compact"
            icon={<AcademicCapIcon />}
            title="Education"
        >
            {educationList.map((education) => (
                <TimelineItem
                    key={education.id}
                    period={education.period}
                    title={education.title}
                    organization={education.organization}
                    description={education.description}
                />
            ))}
        </ProfileSectionCard>
    )
}
