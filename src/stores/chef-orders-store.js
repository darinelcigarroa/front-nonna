import { defineStore, acceptHMRUpdate } from 'pinia'

export const useChefOrdersStore = defineStore('chefOrders', {
  state: () => ({
    orders: [],
  }),

  getters: {},

  actions: {
    addOrder() {

    },
  },
  persist: true,
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useChefOrdersStore, import.meta.hot))
}
