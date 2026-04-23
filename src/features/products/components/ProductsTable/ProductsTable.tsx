import {
    Button,
    Checkbox,
    DataTableSkeleton,
    EmptyState,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@/shared/components'
import {
    ExclamationCircleIcon,
    PencilAltSolidIcon,
} from '@/shared/assets/icons'
import { ProductInfo } from './ProductInfo/ProductInfo'
import type { ProductListItem } from '@/features/products/types'
import styles from './ProductsTable.module.scss'

type ProductsTableProps = {
    products: ProductListItem[]
    loading: boolean
}

export const ProductsTable = ({
    products,
    loading,
}: ProductsTableProps) => {
    const isEmpty = !products || products.length === 0

    if (loading) return <DataTableSkeleton className={styles.table} />

    if (isEmpty) {
        return (
            <EmptyState
                icon={<ExclamationCircleIcon />}
                title="No products"
                description="There are no products to display."
            />
        )
    }

    return (
        <div className={styles.wrapper}>
            <Table className={styles.table} borderedRows>
                <TableHead>
                    <TableRow>
                        <TableCell className={styles.checkbox} size="lg" header>
                            <Checkbox />
                        </TableCell>
                        <TableCell className={styles.name} size="lg" header>
                            Name
                        </TableCell>
                        <TableCell className={styles.category} size="lg" header>
                            Category
                        </TableCell>
                        <TableCell className={styles.brand} size="lg" header>
                            Brand
                        </TableCell>
                        <TableCell className={styles.price} size="lg" header>
                            Price
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id} size="lg">
                            <TableCell className={styles.checkbox} size="lg">
                                <Checkbox />
                            </TableCell>
                            <TableCell className={styles.name} size="lg">
                                <ProductInfo
                                    imageUrl={product.image}
                                    name={product.name}
                                />
                            </TableCell>
                            <TableCell className={styles.category} size="lg">
                                {product.category}
                            </TableCell>
                            <TableCell className={styles.brand} size="lg">
                                {product.brand}
                            </TableCell>
                            <TableCell className={styles.price} size="lg">
                                {product.price}
                            </TableCell>
                            <TableCell className={styles.actions} size="lg">
                                <Button
                                    size="md"
                                    variant="primary"
                                    iconPosition="left"
                                    icon={<PencilAltSolidIcon />}
                                >
                                    Edit Item
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
