import { api } from '@/services/api'
import type { DashboardData } from '../types'

export const getDashboard = async () => {
    const { data } = await api.get<DashboardData>('/dashboard')

    return data
}
