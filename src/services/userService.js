import { api } from 'boot/axios'


export default {

    async update(id, payload) {
        try {
            const response = await api.patch(`user/${id}`, payload)
            return response.data
        } catch (error) {
            return error.response?.data || {
                sucsses: false,
                message: 'Error al obtener la orden'
            }
        }
    },
}
