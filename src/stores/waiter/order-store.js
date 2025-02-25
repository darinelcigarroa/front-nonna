import { defineStore, acceptHMRUpdate } from 'pinia'

export const useOrderStore = defineStore('order', {
  state: () => ({
    table: '',
    numberDiners: '',
    order: {},
  }),

  getters: {},

  actions: {
    setOrder({ table, numberDiners, orderedDishes }) {
      this.table = table
      this.numberDiners = numberDiners
      this.order = { ...orderedDishes }
    },
    resetState() {
      this.table = ''
      this.numberDiners = ''
      this.order = {}
    },
  },
  persist: true,
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot))
}
