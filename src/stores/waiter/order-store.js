import { defineStore, acceptHMRUpdate } from 'pinia'

export const useOrderStore = defineStore('order', {
  state: () => ({
    table: null,
    numberDiners: 1,
    order: {},
  }),

  getters: {},

  actions: {
    setOrder({ table, numberDiners, orderedDishes }) {
      this.table = table || null
      this.numberDiners = numberDiners || 1
      this.order = { ...orderedDishes }
    },

    resetState() {
      this.$reset()
    },
  },

  persist: true,
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot))
}
