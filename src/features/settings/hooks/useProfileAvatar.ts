import { useRef, type ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import { Toast } from '@/shared/lib'
import { updateAvatar } from '../store'

export const useProfileAvatar = () => {
    const dispatch = useAppDispatch()
    const inputRef = useRef<HTMLInputElement>(null)

    const avatarLoading = useAppSelector(
        (state) => state.settings.avatarLoading,
    )

    const openFilePicker = () => {
        if (avatarLoading) return

        inputRef.current?.click()
    }

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (!file) return

        try {
            await dispatch(
                updateAvatar({
                    avatar: file,
                }),
            ).unwrap()

            Toast.success('Profile picture updated successfully.')
        } catch (error) {
            Toast.error(
                typeof error === 'string'
                    ? error
                    : 'Unable to update profile picture. Please try again.',
            )
        } finally {
            event.target.value = ''
        }
    }

    return {
        inputRef,
        avatarLoading,
        openFilePicker,
        handleFileChange,
    }
}
