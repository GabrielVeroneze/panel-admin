import { Card } from '@/shared/components'
import styles from './AboutSection.module.scss'

type AboutSectionProps = {
    about: string
}

export const AboutSection = ({ about }: AboutSectionProps) => {
    return (
        <Card className={styles.container}>
            <h3 className={styles.title}>About me</h3>
            <p className={styles.description}>{about}</p>
        </Card>
    )
}
