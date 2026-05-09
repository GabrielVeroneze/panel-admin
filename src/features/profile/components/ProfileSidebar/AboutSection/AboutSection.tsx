import styles from './AboutSection.module.scss'

type AboutSectionProps = {
    about: string
}

export const AboutSection = ({ about }: AboutSectionProps) => {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>About me</h3>
            <p className={styles.description}>{about}</p>
        </div>
    )
}
