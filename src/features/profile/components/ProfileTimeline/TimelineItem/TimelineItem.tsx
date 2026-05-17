import styles from './TimelineItem.module.scss'

type TimelineItemProps = {
    image: string
    title: string
    subtitle: string
}

export const TimelineItem = ({ image, title, subtitle }: TimelineItemProps) => {
    return (
        <div className={styles.item}>
            <img className={styles.image} src={image} alt={title} />
            <div className={styles.content}>
                <h4 className={styles.title}>{title}</h4>
                <p className={styles.subtitle}>{subtitle}</p>
            </div>
        </div>
    )
}
