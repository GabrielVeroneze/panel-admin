import axios, { type AxiosError, type AxiosResponse } from 'axios'
import { store } from '@/store'
import { getSession, clearSessionStorage } from '@/shared/utils'
import { clearSession } from '@/features/auth/store'

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 2000,
    headers: {
        Accept: 'application/json',
    },
})

api.interceptors.request.use(
    (config) => {
        const session = getSession()

        if (session) {
            config.headers.Authorization = `Bearer ${session.token}`
        }

        return config
    },
    (error: AxiosError) => Promise.reject(error),
)

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response) {
            const status = error.response.status
            const url = error.config?.url

            const isAuthRequest =
                url === '/auth/sign-in' || url === '/auth/sign-up'

            if (status === 401 && !isAuthRequest) {
                clearSessionStorage()

                store.dispatch(clearSession())
            }
        }

        return Promise.reject(error)
    },
)
