import { defineStore, acceptHMRUpdate } from 'pinia'
import { notifySuccess } from '@/utils/notify'

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: [],
  }),

  getters: {},

  actions: {
    addOrderStore(payload) {
      this.orders.push(payload)
      notifySuccess()
    },
  },
  persist: true,
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrdersStore, import.meta.hot))
}
