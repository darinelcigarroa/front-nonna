import { api } from 'boot/axios'


export default {
    async index() {
        try {
            const response = await api.get(`waiter/order-item`)
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
            const response = await api.post('waiter/order-item', payload)
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
            const response = await api.get(`waiter/order-item/${id}/edit`)
            return response.data
        } catch (error) {
            return error.response?.data || {
                sucsses: false,
                message: 'Error al obtener la orden'
            }
        }
    },
    async update(payload) {
        try {
            const response = await api.patch(`waiter/order-item/${payload.orderID}`, payload)
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
            const response = await api.delete(`waiter/order-item/${orderItemID}`)
            return response.data
        } catch (error) {
            return error.response?.data || {
                sucsses: false,
                message: 'Error al obtener la orden'
            }
        }
    },
    async updateDishStatus(ids, status_id) {
        try {
            const response = await api.patch(`order-items/status/preparing`, { ids, status_id });
            return response.data
        } catch (error) {
            return error.response?.data || {
                sucsses: false,
                message: 'Error al obtener la orden'
            }
        }
    },

}
