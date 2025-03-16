import { api } from 'boot/axios'


export default {
    async index() {
        try {
            const response = await api.get(`order-item`)
            return response.data
        } catch (error) {
            return error.response?.data || {
                success: false,
                message: 'Error al obtener las ordedes'
            }
        }
    },
    async store(payload) {
        try {
            const response = await api.post('order-item', payload)
            return response.data
        } catch (error) {
            return error.response?.data || {
                success: false,
                message: 'Error al guardar la orden'
            }
        }
    },
    async edit(id) {
        try {
            const response = await api.get(`order-item/${id}/edit`)
            return response.data
        } catch (error) {
            return error.response?.data || {
                sucsses: false,
                message: 'Error al obtener la orden'
            }
        }
    },
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
    async delete(orderItemID) {
        try {
            const response = await api.delete(`order-item/${orderItemID}`)
            return response.data
        } catch (error) {
            return error.response?.data || {
                sucsses: false,
                message: 'Error al obtener la orden'
            }
        }
    },
    async updateDishStatus(orderItems, status_id) {
        try {
            const response = await api.patch('order-items/update-dish-status', { orderItems, status_id });
            return response.data
        } catch (error) {
            return error.response?.data || {
                sucsses: false,
                message: 'Error al obtener la orden'
            }
        }
    },

}
