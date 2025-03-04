import { api } from 'boot/axios'


export default {
    async index() {
        try {
            const response = await api.get('waiter/orders')
            console.log('response', response)
            return response.data
        } catch (error) {
            return error.response?.data || {
                success: false,
                message: 'Error en login'
            }
        }
    },
    async store(payload) {
        try {
            const response = await api.post('waiter/orders', payload)
            return response.data
        } catch (error) {
            return error.response?.data || {
                success: false,
                message: 'Error en login'
            }
        }
    },
}
