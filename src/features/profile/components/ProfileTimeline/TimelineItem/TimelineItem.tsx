import styles from './TimelineItem.module.scss'

type TimelineItemProps = {
    period: string
    title: string
    organization: string
    description: string
}

export const TimelineItem = ({
    period,
    title,
    organization,
    description,
}: TimelineItemProps) => {
    return (
        <div className={styles.item}>
            <div className={styles.indicator}>
                <span className={styles.dot} />
                <span className={styles.line} />
            </div>
            <div className={styles.content}>
                <span className={styles.period}>{period}</span>
                <h4 className={styles.title}>{title}</h4>
                <p className={styles.organization}>{organization}</p>
                <p className={styles.description}>{description}</p>
            </div>
        </div>
    )
}
