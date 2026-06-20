import { useRef, type ChangeEvent } from 'react'
import { useAppDispatch } from '@/store'
import { updateAvatar } from '../store'

export const useProfileAvatar = () => {
    const dispatch = useAppDispatch()
    const inputRef = useRef<HTMLInputElement>(null)

    const openFilePicker = () => {
        inputRef.current?.click()
    }

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (!file) return

        await dispatch(
            updateAvatar({
                avatar: file,
            }),
        )

        event.target.value = ''
    }

    return {
        inputRef,
        openFilePicker,
        handleFileChange,
    }
}
