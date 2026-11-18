import { isAxiosError } from 'axios'

type ApiErrorResponse = {
    message?: string
}

type ApiErrorMessages = {
    fallback: string
    network?: string
    server?: string
}

export const getApiErrorMessage = (
    error: unknown,
    messages: ApiErrorMessages,
) => {
    if (!isAxiosError<ApiErrorResponse>(error)) {
        return messages.fallback
    }

    if (!error.response) {
        return (
            messages.network ??
            'Unable to connect. Check your internet connection and try again.'
        )
    }

    if (error.response.status >= 500) {
        return (
            messages.server ??
            'The service is temporarily unavailable. Please try again later.'
        )
    }

    const message = error.response.data?.message

    if (typeof message === 'string' && message.trim()) {
        return message
    }

    return messages.fallback
}
