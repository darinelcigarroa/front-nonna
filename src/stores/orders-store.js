import { defineStore, acceptHMRUpdate } from 'pinia'

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: [],
  }),

  getters: {},

  actions: {
    addOrderStore(payload) {
      this.orders.push(payload)
    },
  },
  persist: true,
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrdersStore, import.meta.hot))
}
