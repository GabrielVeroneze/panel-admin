import {
    Button,
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@/shared/components'
import { XSolidIcon } from '@/shared/assets/icons'
import { EditProductForm } from '@/features/products/components'
import type { Product } from '@/features/products/types'
import type { UpdateProductFormValues } from '@/features/products/schemas'
import styles from '@/styles/modules/modal.module.scss'

type EditProductModalProps = {
    open: boolean
    product?: Product | null
    onUpdate: (data: UpdateProductFormValues) => void
    onClose: () => void
    onDelete?: () => void
}

export const EditProductModal = ({
    open,
    product,
    onUpdate,
    onClose,
    onDelete,
}: EditProductModalProps) => {
    const formId = 'product-form'

    return (
        <Modal open={open} onClose={onClose}>
            <ModalHeader title="Edit product" onClose={onClose} />
            <ModalContent>
                <EditProductForm
                    formId={formId}
                    product={product}
                    onSubmit={onUpdate}
                />
            </ModalContent>
            <ModalFooter>
                <Button
                    className={styles.button}
                    form={formId}
                    type="submit"
                    variant="primary"
                    size="lg"
                >
                    Save
                </Button>
                <Button
                    className={styles.button}
                    variant="danger"
                    size="lg"
                    iconPosition="left"
                    icon={<XSolidIcon />}
                    onClick={onDelete}
                >
                    Delete product
                </Button>
            </ModalFooter>
        </Modal>
    )
}
