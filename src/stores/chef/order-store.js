import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useOrderStore = defineStore('order', {
  state: () => ({

    orders: ref([]),
  }),


  actions: {


  },

  persist: true,
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot))
}
