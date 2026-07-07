import axios, { type AxiosError, type AxiosResponse } from 'axios'
import { store } from '@/store'
import { getToken, removeToken } from '@/shared/utils'
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
        const token = getToken()

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    },
)

api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response
    },
    (error: AxiosError) => {
        if (error.response) {
            const status = error.response?.status
            const url = error.config?.url

            const isAuthRequest =
                url === '/auth/sign-in' || url === '/auth/sign-up'

            if (status === 401 && !isAuthRequest) {
                removeToken()

                store.dispatch(clearSession())
            }
        }

        return Promise.reject(error)
    },
)
