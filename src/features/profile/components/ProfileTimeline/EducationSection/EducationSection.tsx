import { AcademicCapIcon } from '@/shared/assets/icons'
import { ProfileSectionCard } from '@/features/profile/components'
import { TimelineItem } from '../TimelineItem/TimelineItem'
import type { TimelineEntry } from '@/features/profile/types'

type EducationSectionProps = {
    educationList: TimelineEntry[]
}

export const EducationSection = ({ educationList }: EducationSectionProps) => {
    return (
        <ProfileSectionCard
            variant="compact"
            icon={<AcademicCapIcon />}
            title="Education"
        >
            {educationList.map((education) => (
                <TimelineItem key={education.id} {...education} />
            ))}
        </ProfileSectionCard>
    )
}
