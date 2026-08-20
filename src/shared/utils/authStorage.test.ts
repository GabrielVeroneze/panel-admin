import { beforeEach, describe, expect, it } from 'vitest'
import {
    clearSessionStorage,
    getSession,
    saveSession,
    type Session,
} from './authStorage'

describe('authStorage', () => {
    const session: Session = {
        token: 'test-token',
        userId: 1,
    }

    beforeEach(() => {
        localStorage.clear()
        sessionStorage.clear()
    })

    describe('saveSession', () => {
        it('saves the session in localStorage when rememberMe is true', () => {
            saveSession(session, true)

            expect(localStorage.getItem('auth-session')).toBe(
                JSON.stringify(session),
            )
            expect(sessionStorage.getItem('auth-session')).toBeNull()
        })

        it('saves the session in sessionStorage when rememberMe is false', () => {
            saveSession(session, false)

            expect(sessionStorage.getItem('auth-session')).toBe(
                JSON.stringify(session),
            )
            expect(localStorage.getItem('auth-session')).toBeNull()
        })

        it('clears an existing session before saving a new session', () => {
            localStorage.setItem(
                'auth-session',
                JSON.stringify({
                    token: 'old-local-token',
                    userId: 10,
                }),
            )
            sessionStorage.setItem(
                'auth-session',
                JSON.stringify({
                    token: 'old-session-token',
                    userId: 20,
                }),
            )

            saveSession(session, true)

            expect(localStorage.getItem('auth-session')).toBe(
                JSON.stringify(session),
            )
            expect(sessionStorage.getItem('auth-session')).toBeNull()
        })
    })

    describe('getSession', () => {
        it('returns the session from localStorage', () => {
            localStorage.setItem('auth-session', JSON.stringify(session))

            expect(getSession()).toEqual(session)
        })

        it('returns the session from sessionStorage', () => {
            sessionStorage.setItem('auth-session', JSON.stringify(session))

            expect(getSession()).toEqual(session)
        })

        it('prefers localStorage when both storages contain a session', () => {
            const localSession: Session = {
                token: 'local-token',
                userId: 1,
            }

            const sessionStorageSession: Session = {
                token: 'session-token',
                userId: 2,
            }

            localStorage.setItem('auth-session', JSON.stringify(localSession))
            sessionStorage.setItem(
                'auth-session',
                JSON.stringify(sessionStorageSession),
            )

            expect(getSession()).toEqual(localSession)
        })

        it('returns null when no session exists', () => {
            expect(getSession()).toBeNull()
        })
    })

    describe('clearSessionStorage', () => {
        it('removes the session from localStorage', () => {
            localStorage.setItem('auth-session', JSON.stringify(session))

            clearSessionStorage()

            expect(localStorage.getItem('auth-session')).toBeNull()
        })

        it('removes the session from sessionStorage', () => {
            sessionStorage.setItem('auth-session', JSON.stringify(session))

            clearSessionStorage()

            expect(sessionStorage.getItem('auth-session')).toBeNull()
        })

        it('removes the session from both storages', () => {
            localStorage.setItem('auth-session', JSON.stringify(session))
            sessionStorage.setItem('auth-session', JSON.stringify(session))

            clearSessionStorage()

            expect(localStorage.getItem('auth-session')).toBeNull()
            expect(sessionStorage.getItem('auth-session')).toBeNull()
        })
    })
})
