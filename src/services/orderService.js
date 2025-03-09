import { api } from 'boot/axios'


export default {
    async index() {
        try {
            const response = await api.get('orders')
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
            const response = await api.post('orders', payload)
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
            const response = await api.get(`orders/${id}/edit`)
            return response.data
        } catch (error) {
            return error.response?.data || {
                sucsses: false,
                message: 'Error al obtener la orden'
            }
        }
    },
    async update(orderID, params) {
        try {
            const response = await api.patch(`orders/${orderID}`, params)
            return response.data
        } catch (error) {
            return error.response?.data || {
                sucsses: false,
                message: 'Error al obtener la orden'
            }
        }
    },
    async delete(payload) {
        try {
            const response = await api.delete(`orders/${payload.orderID}`)
            return response.data
        } catch (error) {
            return error.response?.data || {
                sucsses: false,
                message: 'Error al obtener la orden'
            }
        }
    },
    async cancelEditing(orderID) {
        try {
            const response = await api.post(`orders/cancel-editing/${orderID}`)
            return response.data
        } catch (error) {
            return error.response?.data || {
                sucsses: false,
                message: 'Error al obtener la orden'
            }
        }
    },
    async deleteOrderItem(orderItemID) {
        try {
            const response = await api.delete(`orders/delete-order-item/${orderItemID}`)
            return response.data
        } catch (error) {
            return error.response?.data || {
                sucsses: false,
                message: 'Error al obtener la orden'
            }
        }
    },

}
