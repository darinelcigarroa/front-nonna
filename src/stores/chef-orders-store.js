import { defineStore, acceptHMRUpdate } from 'pinia'
import { notifySuccess } from '@/utils/notify'
// import { toRaw } from 'vue'

export const useChefOrdersStore = defineStore('chefOrders', {
  state: () => ({
    orders: [],
  }),

  getters: {},

  actions: {
    addOrder(payload) {
      const clonedPayload = JSON.parse(JSON.stringify(payload))
      console.log('clone', clonedPayload)
      this.orders.push(clonedPayload)
      notifySuccess()
    },
  },
  persist: true,
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useChefOrdersStore, import.meta.hot))
}
