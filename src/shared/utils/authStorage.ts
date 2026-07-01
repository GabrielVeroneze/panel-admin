const TOKEN_KEY = 'auth-token'

export const saveToken = (token: string, rememberMe: boolean) => {
    removeToken()

    const storage = rememberMe ? localStorage : sessionStorage

    storage.setItem(TOKEN_KEY, token)
}

export const getToken = () => {
    const persistentToken = localStorage.getItem(TOKEN_KEY)
    const sessionToken = sessionStorage.getItem(TOKEN_KEY)

    return persistentToken ?? sessionToken
}

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY)
    sessionStorage.removeItem(TOKEN_KEY)
}
