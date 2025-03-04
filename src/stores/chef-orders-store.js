import { defineStore, acceptHMRUpdate } from 'pinia'
import orderService from '@/services/orderService';

export const useChefOrdersStore = defineStore('chefOrders', {
  state: () => ({
    orders: [],
  }),

  getters: {},

  actions: {
    addOrder(payload) {
      const clonedPayload = JSON.parse(JSON.stringify(payload))

      clonedPayload.orders.forEach((item) => {
        item.status = 'Pendiente'
      })

      const response = orderService.store(clonedPayload)

      if (response.success) {
        this.orders.push(clonedPayload)
      }

      return response
    },
  },
  persist: true,
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useChefOrdersStore, import.meta.hot))
}
