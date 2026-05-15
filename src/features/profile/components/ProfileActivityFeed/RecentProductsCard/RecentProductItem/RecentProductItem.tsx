import { Badge } from '@/shared/components'
import styles from './RecentProductItem.module.scss'

type RecentProductItemProps = {
    image: string
    name: string
    category: string
    price: string
}

export const RecentProductItem = ({
    image,
    name,
    category,
    price,
}: RecentProductItemProps) => {
    return (
        <div className={styles.item}>
            <img className={styles.image} src={image} alt={name} />
            <div className={styles.content}>
                <h4 className={styles.name}>{name}</h4>
                <span className={styles.category}>{category}</span>
                <strong className={styles.price}>{price}</strong>
            </div>
            <Badge color="green">In Stock</Badge>
        </div>
    )
}
