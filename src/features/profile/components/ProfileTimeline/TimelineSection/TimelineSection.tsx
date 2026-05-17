import { TimelineItem } from '../TimelineItem/TimelineItem'
import styles from './TimelineSection.module.scss'

type TimelineEntry = {
    id: number
    image: string
    title: string
    subtitle: string
}

type TimelineSectionProps = {
    title: string
    items: TimelineEntry[]
}

export const TimelineSection = ({ title, items }: TimelineSectionProps) => {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.list}>
                {items.map((item) => (
                    <TimelineItem
                        key={item.id}
                        image={item.image}
                        title={item.title}
                        subtitle={item.subtitle}
                    />
                ))}
            </div>
        </div>
    )
}
