export type Session = {
    token: string
    userId: number
}

const SESSION_KEY = 'auth-session'

export const saveSession = (session: Session, rememberMe: boolean) => {
    clearSessionStorage()

    const storage = rememberMe ? localStorage : sessionStorage

    storage.setItem(SESSION_KEY, JSON.stringify(session))
}

export const getSession = (): Session | null => {
    const data =
        localStorage.getItem(SESSION_KEY) ?? sessionStorage.getItem(SESSION_KEY)

    if (!data) {
        return null
    }

    return JSON.parse(data)
}

export const clearSessionStorage = () => {
    localStorage.removeItem(SESSION_KEY)
    sessionStorage.removeItem(SESSION_KEY)
}
