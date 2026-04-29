import {
    Button,
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@/shared/components'
import { CreateProductForm } from '@/features/products/components'
import type { CreateProductFormValues } from '@/features/products/schemas'
import styles from '@/styles/modules/modal.module.scss'

type CreateProductModalProps = {
    open: boolean
    onCreate: (data: CreateProductFormValues) => void
    onClose: () => void
}

export const CreateProductModal = ({
    open,
    onCreate,
    onClose,
}: CreateProductModalProps) => {
    const formId = 'product-form'

    return (
        <Modal open={open} onClose={onClose}>
            <ModalHeader title="Create product" onClose={onClose} />
            <ModalContent>
                <CreateProductForm formId={formId} onSubmit={onCreate} />
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
                    onClick={onClose}
                >
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}
