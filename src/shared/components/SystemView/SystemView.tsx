import { useNavigate } from 'react-router'
import { Button } from '@/shared/components'
import styles from './SystemView.module.scss'

type SystemAction = {
    label: string
    to?: string
    onClick?: () => void
}

type SystemViewProps = {
    image: string
    title: string
    description: string
    action: SystemAction
}

export const SystemView = ({
    image,
    title,
    description,
    action,
}: SystemViewProps) => {
    const navigate = useNavigate()

    const handleAction = () => {
        if (action.onClick) {
            action.onClick()
            return
        }

        if (action.to) {
            navigate(action.to)
        }
    }

    return (
        <section className={styles.container}>
            <img className={styles.image} src={image} alt={title} />
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.description}>{description}</p>
            <Button className={styles.button} size="lg" onClick={handleAction}>
                {action.label}
            </Button>
        </section>
    )
}
