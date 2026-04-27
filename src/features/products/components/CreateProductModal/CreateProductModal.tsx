import {
    Button,
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@/shared/components'
import styles from '@/styles/modules/modal.module.scss'

type CreateProductModalProps = {
    open: boolean
    onCreate: (data: any) => void
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
            <ModalContent>FormComponent</ModalContent>
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
