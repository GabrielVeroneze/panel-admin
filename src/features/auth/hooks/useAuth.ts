import { useAppDispatch, useAppSelector } from '@/store'
import {
    fetchCurrentUserThunk,
    logoutThunk,
    signInThunk,
    signUpThunk,
} from '../store'
import type { SignInFormValues, SignUpFormValues } from '../schemas'

export const useAuth = () => {
    const dispatch = useAppDispatch()

    const { user, authenticated, loading, error } = useAppSelector(
        (state) => state.auth,
    )

    const signIn = (data: SignInFormValues) => {
        return dispatch(signInThunk(data)).unwrap()
    }

    const signUp = (data: SignUpFormValues) => {
        return dispatch(signUpThunk(data)).unwrap()
    }

    const logout = () => {
        return dispatch(logoutThunk()).unwrap()
    }

    const fetchCurrentUser = () => {
        return dispatch(fetchCurrentUserThunk()).unwrap()
    }

    return {
        signIn,
        signUp,
        logout,
        fetchCurrentUser,
        user,
        authenticated,
        loading,
        error,
    }
}
