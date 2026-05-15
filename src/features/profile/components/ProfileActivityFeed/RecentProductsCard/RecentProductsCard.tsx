import { ShoppingBagIcon } from '@/shared/assets/icons'
import { ProfileSectionCard } from '@/features/profile/components'
import { RecentProductItem } from './RecentProductItem/RecentProductItem'
import styles from './RecentProductsCard.module.scss'

type Product = {
    id: number
    image: string
    name: string
    category: string
    price: string
    stockQuantity: number
}

type RecentProductsCardProps = {
    products: Product[]
}

export const RecentProductsCard = ({ products }: RecentProductsCardProps) => {
    return (
        <ProfileSectionCard
            icon={<ShoppingBagIcon />}
            title="Recently Managed Products"
        >
            <div className={styles.products}>
                {products.map((product) => (
                    <RecentProductItem key={product.id} {...product} />
                ))}
            </div>
        </ProfileSectionCard>
    )
}
