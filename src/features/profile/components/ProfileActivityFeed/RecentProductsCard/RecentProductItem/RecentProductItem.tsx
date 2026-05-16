import { Badge } from '@/shared/components'
import type { RecentProduct } from '@/features/profile/types'
import styles from './RecentProductItem.module.scss'

type RecentProductItemProps = RecentProduct

export const RecentProductItem = ({
    image,
    name,
    category,
    price,
    stockQuantity,
}: RecentProductItemProps) => {
    const isInStock = stockQuantity > 0
    const badgeColor = isInStock ? 'green' : 'red'
    const badgeText = isInStock ? 'In Stock' : 'Out of Stock'

    return (
        <div className={styles.item}>
            <img className={styles.image} src={image} alt={name} />
            <div className={styles.content}>
                <h4 className={styles.name}>{name}</h4>
                <span className={styles.category}>{category}</span>
                <strong className={styles.price}>{price}</strong>
            </div>
            <Badge color={badgeColor}>{badgeText}</Badge>
        </div>
    )
}
