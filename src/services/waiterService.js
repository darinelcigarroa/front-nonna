import { api } from 'boot/axios'


export default {
    async store(payload) {
        try {
            console.log(payload, api)
            // const response = await api.post('/login', { email, password })
            // return response.data
        } catch (error) {
            return error.response?.data || {
                success: false,
                message: 'Error en login'
            }
        }
    },
}
