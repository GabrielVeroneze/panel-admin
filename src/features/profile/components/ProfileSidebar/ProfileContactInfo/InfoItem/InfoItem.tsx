import styles from './InfoItem.module.scss'

type InfoItemProps = {
    label: string
    value: string
}

export const InfoItem = ({ label, value }: InfoItemProps) => {
    return (
        <div className={styles.item}>
            <h3 className={styles.label}>{label}</h3>
            <p className={styles.value}>{value}</p>
        </div>
    )
}
