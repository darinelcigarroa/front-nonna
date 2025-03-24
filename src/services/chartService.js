import { api } from 'boot/axios'

export default {

    async getMostUsedTables(params) {
        try {
            const response = await api.get('admin/get-most-used-tables', { params })
            return response.data
        } catch (error) {
            return error.response?.data || {
                success: false,
                message: 'Error inesperado'
            }
        }
    },
    async getMonthlyIncomeTrend(params) {
        try {
            const response = await api.get('admin/get-monthly-income-trend', { params })
            return response.data
        } catch (error) {
            return error.response?.data || {
                sucsses: false,
                message: 'Error inesperado'
            }
        }
    },
    async getServicesAttendedWaiter(params) {
        try {
            const response = await api.get('admin/get-services-attended-waiter', { params })
            return response.data
        } catch (error) {
            return error.response?.data || {
                sucsses: false,
                message: 'Error inesperado'
            }
        }
    },
}